/* eslint-disable unicorn/prefer-dom-node-dataset */

import {Injectable} from '@angular/core';
import {
	CoreApiConst,
	ThemeColorModeInput,
	ThemeColorModeOutput,
} from '@bitmorest/eon-common';
import {BehaviorSubject, SubscriptionLike} from 'rxjs';
import {ColorMode, ObserverOrNext} from '../types';
import {ElectronService} from './electron.service';

@Injectable({providedIn: 'root'})
export class ThemeApiService {
	public currentFlatformMode: string;
	private _currentColorMode = new BehaviorSubject<ColorMode>('light');

	constructor(private _electron: ElectronService) {
		this.currentFlatformMode = window.api.environment.platform;
		document.body.setAttribute('data-theme-platform', this.currentFlatformMode);

		this._electron.receive<ThemeColorModeOutput>(
			CoreApiConst.THEME_COLOR_MODE_STATE,
			(themeColorModeOutput: ThemeColorModeOutput) => {
				const colorMode = themeColorModeOutput.currentColorMode;
				document.body.setAttribute('data-theme-color', colorMode);
				this._currentColorMode.next(colorMode as ColorMode);
			}
		);
	}

	public initialize(colorMode: ColorMode) {
		this._currentColorMode.next(colorMode);
	}

	public subcribe(
		observerOrNext?: ObserverOrNext<ColorMode>
	): SubscriptionLike {
		return this._currentColorMode.subscribe(observerOrNext);
	}

	public changeColorMode(colorMode: ColorMode) {
		this._electron.send<ThemeColorModeInput>(
			CoreApiConst.THEME_COLOR_MODE_STATE,
			{
				currentColorMode: colorMode,
			}
		);
	}
}
