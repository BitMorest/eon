import {CoreApiConst, WindowApiInput, WindowState} from '@bitmorest/eon-common';
import {BrowserWindow} from 'electron';
import {Application, Window} from '../components';
import {ApiService} from './api-service';
// import { Logger } from '../utils';
// const log = new Logger('eon-core');

export class WindowApiService extends ApiService<WindowApiInput, WindowState> {
	receptionChannel(): string {
		return CoreApiConst.WINDOW_API_INPUT;
	}

	sendingChannel(): string {
		return CoreApiConst.WINDOW_API_OUTPUT;
	}

	process(
		_app: Application,
		_window: Window,
		_input: WindowApiInput
	): WindowState {
		const browser: BrowserWindow = _window.browser;

		if (_input?.action) {
			if (_input.action == 'minimize') {
				browser.minimize();
			} else if (_input.action == 'close') {
				browser.close();
			} else if (_input.action == 'toogleMaximize') {
				browser.isMaximized() ? browser.unmaximize() : browser.maximize();
			}
		}

		return {
			isMaximized: browser.isMaximized(),
			isMaximiable: browser.isMaximizable(),
			isMinimizable: browser.isMinimizable(),
		};
	}
}
