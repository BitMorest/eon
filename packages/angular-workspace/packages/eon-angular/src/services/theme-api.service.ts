/* eslint-disable unicorn/prefer-dom-node-dataset */

import {Injectable} from '@angular/core';
import {CoreApiConst, ThemeApiInput, ThemeData} from '@bitmorest/eon-common';
import {BehaviorSubject, filter, map, Observer, SubscriptionLike} from 'rxjs';
import {ElectronService} from './electron.service';

@Injectable({providedIn: 'root'})
export class ThemeApiService {
	private _body = document.body;
	private _themeData = new BehaviorSubject<ThemeData | undefined>(undefined);

	constructor(private _electron: ElectronService) {
		this._body.setAttribute('data-theme-color', 'light');
		this._body.setAttribute('data-theme-platform', 'darwin');
		this.setupTheme();
	}

	private setupTheme() {
		this._electron.receive<ThemeData>(
			CoreApiConst.THEME_API_OUTPUT,
			(themeData: ThemeData) => {
				this._themeData.next(themeData);
				this._body.setAttribute('data-theme-color', themeData.current);
				this._body.setAttribute(
					'data-theme-platform',
					window.api.environment.platform
				);
			}
		);
		this._electron.send<ThemeApiInput>(CoreApiConst.THEME_API_INPUT, {});
	}

	public subcribe(
		observerOrNext?: Partial<Observer<ThemeData>> | ((value: ThemeData) => void)
	): SubscriptionLike {
		return this._themeData
			.pipe(filter((data) => data !== undefined))
			.pipe(map((data) => data as ThemeData))
			.subscribe(observerOrNext);
	}

	public changeTheme(theme: string) {
		this._electron.send<ThemeApiInput>(CoreApiConst.THEME_API_INPUT, {
			current: theme,
		});
	}
}
