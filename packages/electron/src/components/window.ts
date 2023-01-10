import {
	app,
	BrowserWindow,
	BrowserWindowConstructorOptions,
	ipcMain,
	nativeImage,
	WebPreferences,
} from 'electron';
import {ApiService} from '../services/api-service';
import * as remoteMain from '@electron/remote/main';
import {Application} from './application';
import _ from 'lodash';
import {UiModeApiService} from '../services/ui-mode-api-service';
import {WindowApiService} from '../services/window-api-service';
import contextMenu from 'electron-context-menu';
import {LanguageApiService} from '../services/language-api-service';
import path from 'node:path';
import {edizzyDebugGenerator} from '../utils/debuger';
const debug = edizzyDebugGenerator('window');

declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

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
		debug('instance creating');
		this.application = application;
		this.services = services;
		this.onRegisterService();
		this.createWindow(options);
		this.loadRenderer();
	}

	private createWindow(customOptions: BrowserWindowConstructorOptions): void {
		debug('createWindow()', customOptions);

		let defaultOptions: BrowserWindowConstructorOptions = {
			width: 1280,
			height: 720,
			webPreferences: {
				devTools:
					this.application.enviroment.debug &&
					this.application.enviroment.debug.devTools,
			},
		};
		defaultOptions = _.merge(defaultOptions, customOptions);

		const overideWebPreferences: WebPreferences = {
			// Default behavior in Electron since 5, that
			// limits the powers granted to remote content
			// except in e2e test when those powers are required
			nodeIntegration: this.application.enviroment.env == 'testing',
			// Isolate window context to protect against prototype pollution
			// except in e2e test when that access is required
			contextIsolation: this.application.enviroment.env !== 'testing',
			// Introduced in Electron 20 and enabled by default
			// Among others security constraints, it prevents from required
			// CommonJS modules imports into preload script
			// which is not bundled yet in dev mode
			// @Todo Read more about sandbox
			sandbox: undefined,
			// Use a preload script to enhance security
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		};

		debug(
			'Browser window options',
			_.merge(defaultOptions, {
				icon: this.loadIcon(),
				webPreferences: overideWebPreferences,
			})
		);

		this.browser = new BrowserWindow(
			_.merge(defaultOptions, {
				icon: this.loadIcon(),
				webPreferences: overideWebPreferences,
			})
		);

		// Disable the remote module to enhance security
		// except in e2e test when that access is required
		if (this.application.enviroment.env == 'testing') {
			remoteMain.enable(this.browser.webContents);
		}
	}

	private loadRenderer(): void {
		debug('loadRenderer()', {environment: this.application.enviroment.name});
		if (this.application.enviroment.name == 'development') {
			// Dev mode, take advantage of the live reload by loading local URL
			this.browser?.loadURL(`http://localhost:4200`);
			if (this.application.enviroment.debug?.inspectElementMenu) {
				contextMenu({
					window: this.browser,
					showInspectElement: true,
					showCopyLink: true,
					showCopyImageAddress: true,
					showCopyImage: true,
					showCopyVideoAddress: true,
				});
			}
			if (this.application.enviroment.debug?.devTools) {
				this.browser?.webContents.openDevTools({
					mode: 'undocked',
					activate: true,
				});
			}
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

	private loadIcon(): Electron.NativeImage | undefined {
		let iconObject;
		if (this.application.enviroment.name == 'development') {
			const iconPath = path.join(
				__dirname,
				'../renderer/angular_window/assets/icons/icon.png'
			);
			debug('Icon Path', iconPath);
			iconObject = nativeImage.createFromPath(iconPath);
			// Change dock icon on MacOS
			if (iconObject && process.platform === 'darwin') {
				app.dock.setIcon(iconObject);
			}
		}
		return iconObject;
	}

	protected onRegisterService(): void {
		debug('onRegisterService()');
		this.registerService(new LanguageApiService());
		this.registerService(new UiModeApiService());
		this.registerService(new WindowApiService());
		for (const service of this.services) {
			this.registerService(service);
		}
	}

	protected registerService(service: ApiService<unknown, unknown>) {
		debug(`registerService()`, {
			'Class Name': service.constructor.name,
			'Reception Channel': service.receptionChannel(),
			'Sending Channel': service.sendingChannel(),
		});
		service.booting(this.application, this);
		ipcMain.on(
			service.receptionChannel(),
			async (_event: Electron.IpcMainEvent, ...parameters: any[]) => {
				// Handling input
				const input = parameters[0];
				debug(`[${service.receptionChannel()}]  =====> `, input);
				const output = service.process(this.application, this, input);

				// Handling output
				if (service.sendingChannel()) {
					debug(`[${service.sendingChannel()}] =====> `, output);
					this.browser?.webContents.send(service.sendingChannel(), output);
				}
			}
		);
	}
}
