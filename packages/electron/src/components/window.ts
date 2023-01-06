import {
	BrowserWindow,
	BrowserWindowConstructorOptions,
	ipcMain,
	WebPreferences,
} from 'electron';
import {ApiService} from '../services/api-service';
import * as remoteMain from '@electron/remote/main';
import {Application} from './application';
import _ from 'lodash';
import {Logger} from '../utils';
import {Environment} from '../models';
import {UiModeApiService} from '../services/ui-mode-api-service';
import {WindowApiService} from '../services/window-api-service';
import contextMenu from 'electron-context-menu';
import {LanguageApiService} from '../services/language-api-service';
import {InitializeApiService} from '../services/initiallize-api-service';

declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
const log = new Logger('eon-core');
const environment = Environment.load();

export class Window {
	public services: Array<ApiService<unknown, unknown>> = new Array<
		ApiService<unknown, unknown>
	>();
	private application: Application;
	public browser?: BrowserWindow;

	constructor(
		application: Application,
		options: BrowserWindowConstructorOptions,
		services: Array<ApiService<unknown, unknown>>
	) {
		log.debug('instance creating');
		this.application = application;
		this.services = services;
		this.onRegisterService();
		this.createWindow(options);
		this.loadRenderer();
	}

	private createWindow(customOptions: BrowserWindowConstructorOptions): void {
		log.debug('createWindow()', customOptions);
		let defaultOptions: BrowserWindowConstructorOptions = {
			width: 1280,
			height: 720,
			webPreferences: {
				devTools: environment.env == 'development',
			},
		};
		defaultOptions = _.merge(defaultOptions, customOptions);

		const overideWebPreferences: WebPreferences = {
			// Default behavior in Electron since 5, that
			// limits the powers granted to remote content
			// except in e2e test when those powers are required
			nodeIntegration: environment.env == 'testing',
			// Isolate window context to protect against prototype pollution
			// except in e2e test when that access is required
			contextIsolation: environment.env !== 'testing',
			// Introduced in Electron 20 and enabled by default
			// Among others security constraints, it prevents from required
			// CommonJS modules imports into preload script
			// which is not bundled yet in dev mode
			// @Todo Read more about sandbox
			sandbox: undefined,
			// Use a preload script to enhance security
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		};

		log.debug(
			'Browser window options',
			_.merge(defaultOptions, {webPreferences: overideWebPreferences})
		);

		this.browser = new BrowserWindow(
			_.merge(defaultOptions, {webPreferences: overideWebPreferences})
		);

		// Disable the remote module to enhance security
		// except in e2e test when that access is required
		if (environment.env == 'testing') {
			remoteMain.enable(this.browser.webContents);
		}
	}

	private loadRenderer(): void {
		log.debug('loadRenderer()', {environment: environment.env});
		if (environment.env == 'development') {
			// Dev mode, take advantage of the live reload by loading local URL
			this.browser?.loadURL(`http://localhost:4200`);
			contextMenu({
				window: this.browser,
				showInspectElement: true,
				showCopyLink: true,
				showCopyImageAddress: true,
				showCopyImage: true,
				showCopyVideoAddress: true,
			});
			this.browser?.webContents.openDevTools({
				mode: 'undocked',
				activate: true,
			});
		} else {
			// Else mode, we simply load angular bundle
			this.browser?.loadURL(`file://angular_window/index.html`);
		}

		// When the window is closed`
		this.browser?.on('closed', () => {
			// Remove IPC Main listeners
			ipcMain.removeAllListeners();
			// Delete current reference
			delete this.browser;
		});
	}

	protected onRegisterService(): void {
		log.debug('onRegisterService()');
		this.registerService(new InitializeApiService());
		this.registerService(new LanguageApiService());
		this.registerService(new UiModeApiService());
		this.registerService(new WindowApiService());
		for (const service of this.services) {
			this.registerService(service);
		}
	}

	protected registerService(service: ApiService<unknown, unknown>) {
		log.debug(`registerService()`, {
			'Class Name': service.constructor.name,
			'Reception Channel': service.receptionChannel(),
			'Sending Channel': service.sendingChannel(),
		});

		ipcMain.on(
			service.receptionChannel(),
			async (_event: Electron.IpcMainEvent, ...parameters: any[]) => {
				// Handling input
				const input = parameters[0];
				log.debug(`[${service.receptionChannel()}]  =====> `, input);
				const output = service.process(this.application, this, input);

				// Handling output
				if (service.sendingChannel()) {
					log.debug(`[${service.sendingChannel()}] =====> `, output);
					this.browser?.webContents.send(service.sendingChannel(), output);
				}
			}
		);
	}
}
