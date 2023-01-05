/* eslint-disable unicorn/prefer-dom-node-dataset */

import {Injectable} from '@angular/core';
import {
	CoreApiConst,
	ThemeColorModeInput,
	ThemeColorModeOutput,
} from '@bitmorest/eon-common';
import {BehaviorSubject, SubscriptionLike} from 'rxjs';
import {ObserverOrNext} from '../types';
import {ElectronService} from './electron.service';

@Injectable({providedIn: 'root'})
export class ThemeApiService {
	public currentFlatformMode: string;
	private _currentColorMode = new BehaviorSubject<string>('light');

	constructor(private _electron: ElectronService) {
		this.currentFlatformMode = window.api.environment.platform;
		document.body.setAttribute('data-theme-platform', this.currentFlatformMode);

		this._electron.receive<ThemeColorModeOutput>(
			CoreApiConst.THEME_COLOR_MODE,
			(themeColorModeOutput: ThemeColorModeOutput) => {
				const colorMode = themeColorModeOutput.currentColorMode;
				document.body.setAttribute('data-theme-color', colorMode);
				this._currentColorMode.next(colorMode);
			}
		);
	}

	public initialize(colorMode: string) {
		document.body.setAttribute('data-theme-color', colorMode);
		this._currentColorMode.next(colorMode);
	}

	public subcribe(observerOrNext?: ObserverOrNext<string>): SubscriptionLike {
		return this._currentColorMode.subscribe(observerOrNext);
	}

	public changeColorMode(colorMode: string) {
		this._electron.send<ThemeColorModeInput>(CoreApiConst.THEME_COLOR_MODE, {
			currentColorMode: colorMode,
		});
	}
}
