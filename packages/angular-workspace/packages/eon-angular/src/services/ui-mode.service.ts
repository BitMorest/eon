/* eslint-disable unicorn/prefer-dom-node-dataset */

import {Injectable} from '@angular/core';
import {
	CoreApiConst,
	ColorModeInput,
	ColorModeOutput,
} from '@bitmorest/eon-common';
import {BehaviorSubject, SubscriptionLike} from 'rxjs';
import {ObserverOrNext} from '../types';
import {ElectronService} from './electron.service';

@Injectable({providedIn: 'root'})
export class UIModeService {
	public currentFlatformMode: string;
	private _currentColorMode = new BehaviorSubject<boolean>(false);

	constructor(private _electron: ElectronService) {
		this.currentFlatformMode = window.api.environment.platform;
		document.body.setAttribute('ui-platform-mode', this.currentFlatformMode);

		this._electron.receive<ColorModeOutput>(
			CoreApiConst.UI_MODE,
			(data: ColorModeOutput) => {
				this.initialize(data.isDarkMode);
			}
		);
	}

	public initialize(isDarkMode: boolean) {
		if (isDarkMode) {
			this._currentColorMode.next(isDarkMode);
			document.body.setAttribute('ui-color-mode', 'dark');
		} else {
			document.body.setAttribute('ui-color-mode', 'light');
		}
	}

	public subcribe(observerOrNext?: ObserverOrNext<boolean>): SubscriptionLike {
		return this._currentColorMode.subscribe(observerOrNext);
	}

	public changeColorMode(isDarkMode: boolean) {
		this._electron.send<ColorModeInput>(CoreApiConst.UI_MODE, {
			isDarkMode: isDarkMode,
		});
	}
}
