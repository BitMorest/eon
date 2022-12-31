import {
	BrowserWindowConstructorOptions,
	WebContents,
	app,
	shell,
} from 'electron';
import {ApiService} from '../services/api-service';
import {Window} from './window';
import {Logger} from '../utils';
import {Language} from '@bitmorest/eon-common';
import {Language as LanguageManager} from './language';
const log = new Logger('eon-core');

import { Environment } from '../models';
const enviroment = Environment.load();

export class Application {
	private static instance?: Application;

	public static create(
		windowOptions: BrowserWindowConstructorOptions,
		languages: Array<Language>
	): Application {
		if (!this.instance) {
			this.instance = new Application(windowOptions, languages);
		}
		return this.instance;
	}

	public static get current(): Application {
		return this.instance;
	}

	public services: Array<ApiService<unknown, unknown>>;
	public mainWindow: Window | undefined;
	public windowOptions: BrowserWindowConstructorOptions;

	private constructor(
		windowOptions: BrowserWindowConstructorOptions,
		languages: Array<Language>
	) {
		log.debug('application instance creating');
		this.services = new Array<ApiService<unknown, unknown>>();
		this.windowOptions = windowOptions;
		LanguageManager.getInstance().registerSupportLanguages(languages);
		process.on('uncaughtException', this.onUncaughtException);
	}

	public addApiService(service: ApiService<unknown, unknown>) {
		log.debug(`addApiService()`, {
			'Class Name': service.constructor.name,
			'Reception Channel': service.receptionChannel(),
			'Sending Channel': service.sendingChannel(),
		});
		this.services.push(service);
		return this;
	}

	public run() {
		log.debug(`run()`);
		app.on('ready', this.onReady);
		app.on('activate', this.onActive);
		app.on('window-all-closed', this.onWindowAllClosed);
		app.on('web-contents-created', this.onWebContentCreated);
	}

	private onReady() {
		log.debug(`onReady()`);
		Application.current.onCreateWindow();
	}

	private onActive() {
		log.debug(`onActive()`);
		Application.current.onCreateWindow();
	}

	private onCreateWindow() {
		// On MacOS it is common to re-create a window from app even after all windows have been closed
		if (!Application.current.mainWindow) {
			log.debug(`onCreateWindow()`);
			Application.current.mainWindow = new Window(
				Application.current,
				Application.current.windowOptions,
				Application.current.services
			);
		}
	}

	private onWindowAllClosed() {
		log.debug('onWindowAllClosed');
		// On MacOS it is common for applications to stay open until the user explicitly quits
		// But WebDriverIO Test Runner does handle that behaviour yet
		if (enviroment.platform == 'darwin' || enviroment.env == 'testing') {
			app.quit();
		}
	}

	private onWebContentCreated(event: Electron.Event, contents: WebContents) {
		contents.setWindowOpenHandler((handler: Electron.HandlerDetails) => {
			// Telling the user platform to open this event's url in the external default browser
			shell.openExternal(handler.url);
			// Blocking this event from loading in current app
			return {action: 'deny'};
		});

		// Limiting navigation
		contents.on(
			'will-navigate',
			(event: Electron.Event, navigationUrl: string) => {
				// Allowing local navigation only
				const parsedUrl = new URL(navigationUrl);
				if (parsedUrl.origin !== 'http://localhost:4200') {
					event.preventDefault();
				}
			}
		);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private onUncaughtException(message: string, onUncaughtException: any) {
		log.error(message, {exception: onUncaughtException});
	}
}
