import {Injectable} from '@angular/core';
import {CoreApiConst, ThemeApiInput, ThemeData} from '@bitmorest/eon-common';
import {BehaviorSubject, filter, map, Observer, SubscriptionLike} from 'rxjs';
import {ElectronService} from './electron.service';

@Injectable({providedIn: 'root'})
export class ThemeApiService {
	private _body = document.body;
	private _themeData = new BehaviorSubject<ThemeData | undefined>(undefined);

	/* eslint-disable unicorn/prefer-dom-node-dataset */
	constructor(private _electron: ElectronService) {
		this._body.setAttribute('theme-color', 'light');
		this._body.setAttribute('theme-flatform', 'win32');

		// implement for bootstrap
		// this._body.setAttribute('data-bs-theme', 'dark');
		// this.setupTheme();
	}

	private setupTheme() {
		this._electron.receive<ThemeData>(
			CoreApiConst.THEME_API_OUTPUT,
			(themeData: ThemeData) => {
				this._themeData.next(themeData);
				this._body.setAttribute('platform', window.api.environment.platform);
				this._body.setAttribute('theme', themeData.current);

				// implement for bootstrap
				// this._body.dataset.bsTheme = themeData.current;
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
