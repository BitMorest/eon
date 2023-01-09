import {
	CoreApiConst,
	CoreWindowStateInput as In,
	CoreWindowStateOutput as Out,
} from '@e-dizzy/types';
import {BrowserWindow} from 'electron';
import {Application} from '../components/application';
import {Window} from '../components/window';
import {ApiService} from './api-service';

export class WindowApiService extends ApiService<In, Out> {
	booting(_app: Application, _window: Window): void {
		/* eslint-disable @typescript-eslint/no-empty-function */
	}

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

		if (_input?.windowState?.isMaximiable) {
			browser.setMaximizable(_input.windowState.isMaximiable);
		}

		if (_input?.windowState?.isMinimizable) {
			browser.setMinimizable(_input.windowState.isMinimizable);
		}

		return this.getWindowState(_window);
	}

	getWindowState(_window: Window) {
		const browser: BrowserWindow = _window.browser;
		return {
			isMaximized: browser.isMaximized(),
			isMaximiable: browser.isMaximizable(),
			isMinimizable: browser.isMinimizable(),
		};
	}
}
