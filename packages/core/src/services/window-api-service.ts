import {
	CoreApiConst,
	CoreWindowStateInput as In,
	CoreWindowStateOutput as Out,
} from '@bitmorest/eon-common';
import {BrowserWindow} from 'electron';
import {Application, Window} from '../components';
import {ApiService} from './api-service';
// import { Logger } from '../utils';
// const log = new Logger('eon-core');

export class WindowApiService extends ApiService<In, Out> {
	receptionChannel(): string {
		return CoreApiConst.WINDOW_STATE;
	}

	sendingChannel(): string {
		return CoreApiConst.WINDOW_STATE;
	}

	process(_app: Application, _window: Window, _input: In): Out {
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
