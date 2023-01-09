import {
	BrowserWindowConstructorOptions,
	WebContents,
	app,
	shell,
	protocol,
} from 'electron';
import {ApiService} from '../services/api-service';
import {Window} from './window';
import path from 'node:path';
import {
	Environment,
	EnvironmentConfig,
	EnvironmentsConfig,
} from '@e-dizzy/types';
import _ from 'lodash';
import {edizzyDebugGenerator} from '../utils/debuger';

import {Logger} from '../utils/logger';
import {platform} from 'node:process';
const log = new Logger('core');
const debug = edizzyDebugGenerator('application');

export class Application {
	private static instance?: Application;

	public static create(
		windowOptions: BrowserWindowConstructorOptions,
		enviroments: EnvironmentsConfig<EnvironmentConfig>
	): Application {
		if (!this.instance) {
			this.instance = new Application(windowOptions, enviroments);
		}
		return this.instance;
	}

	public static get current(): Application {
		return this.instance;
	}

	public services: Array<ApiService<unknown, unknown>>;
	public mainWindow: Window | undefined;
	public windowOptions: BrowserWindowConstructorOptions;
	public enviroment: Environment;

	private constructor(
		windowOptions: BrowserWindowConstructorOptions,
		enviroments: EnvironmentsConfig<EnvironmentConfig>
	) {
		debug('application instance creating');
		this.services = new Array<ApiService<unknown, unknown>>();
		this.windowOptions = windowOptions;
		const environment = this.getNodeEnv();
		if (enviroments[environment].name) {
			throw new TypeError("Enviroment config can't have contain key 'name'!");
		}
		this.enviroment = _.merge({name: environment}, enviroments[environment]);
		process.on('uncaughtException', this.onUncaughtException);
	}

	public addApiService(service: ApiService<unknown, unknown>) {
		debug(`addApiService()`, {
			'Class Name': service.constructor.name,
			'Reception Channel': service.receptionChannel(),
			'Sending Channel': service.sendingChannel(),
		});
		this.services.push(service);
		return this;
	}

	public run() {
		debug(`run()`);
		app.on('ready', this.onReady);
		app.on('activate', this.onActive);
		app.on('window-all-closed', this.onWindowAllClosed);
		app.on('web-contents-created', this.onWebContentCreated);
	}

	private onReady() {
		debug(`onReady()`);
		protocol.interceptFileProtocol('file', (request, callback) => {
			const root = path.join(__dirname, '../renderer');
			let target = request.url.replace('file://', '');

			if (target == 'angular_window/') {
				target += 'index.html';
			}

			callback({path: `${root}/${target}`});
		});
		Application.current.onCreateWindow();
	}

	private onActive() {
		debug(`onActive()`);
		Application.current.onCreateWindow();
	}

	private onCreateWindow() {
		// On MacOS it is common to re-create a window from app even after all windows have been closed
		if (!Application.current.mainWindow) {
			debug(`onCreateWindow()`);
			Application.current.mainWindow = new Window(
				Application.current,
				Application.current.windowOptions,
				Application.current.services
			);
		}
	}

	private onWindowAllClosed() {
		debug('onWindowAllClosed');
		// On MacOS it is common for applications to stay open until the user explicitly quits
		// But WebDriverIO Test Runner does handle that behaviour yet
		if (platform !== 'darwin' || this.enviroment.name == 'testing') {
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
				if (
					parsedUrl.origin !== 'http://localhost:4200' &&
					!parsedUrl.origin.startsWith('file://')
				) {
					event.preventDefault();
				}
			}
		);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private onUncaughtException(message: string, onUncaughtException: any) {
		log.error(message, {exception: onUncaughtException});
	}

	private getNodeEnv(): 'development' | 'production' | 'testing' {
		if (!process.env.NODE_ENV) {
			return 'development';
		} else if (
			['development', 'production', 'testing'].includes(process.env.NODE_ENV)
		) {
			return process.env.NODE_ENV as 'development' | 'production' | 'testing';
		} else {
			throw new Error(
				`NODE_ENV only acccept values is 'development' | 'production' | 'testing'`
			);
		}
	}
}
