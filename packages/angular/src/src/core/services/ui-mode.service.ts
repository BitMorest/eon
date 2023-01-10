/* eslint-disable unicorn/prefer-dom-node-dataset */

import {Injectable} from '@angular/core';
import {CoreApiConst, ColorModeInput, ColorModeOutput} from '@e-dizzy/types';
import {BehaviorSubject, SubscriptionLike} from 'rxjs';
import {ObserverOrNext} from '../../types';
import {ElectronService} from './electron.service';

@Injectable({providedIn: 'root'})
export class UIModeService {
	private _currentColorMode = new BehaviorSubject<boolean>(false);

	constructor(private _electron: ElectronService) {
		const appInfo = (window as Window).application;
		document.body.setAttribute('ui-platform-mode', appInfo.platform.name);
		this.initialize(appInfo.initializeData.darkMode);
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
