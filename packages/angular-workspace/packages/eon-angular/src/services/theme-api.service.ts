import {Injectable} from '@angular/core';
import {CoreApiConst, ThemeApiInput, ThemeData} from '@bitmorest/eon-common';
import {BehaviorSubject, filter, map, Observer, SubscriptionLike} from 'rxjs';
import {ElectronService} from './electron.service';

@Injectable({providedIn: 'root'})
export class ThemeApiService {
	private _body = document.body;
	private _themeData = new BehaviorSubject<ThemeData | undefined>(undefined);

	constructor(private _electron: ElectronService) {
		this._body.classList.add('platform-win32');
		this._body.classList.add('theme-dark');
		// this.setupTheme();
	}

	private setupTheme() {
		this._electron.receive<ThemeData>(
			CoreApiConst.THEME_API_OUTPUT,
			(themeData: ThemeData) => {
				this._themeData.next(themeData);

				/* eslint-disable-next-line unicorn/no-array-for-each */
				this._body.classList.forEach((value) => {
					if (value.startsWith('theme-')) {
						this._body.classList.remove(value);
					}
				});
				this._body.classList.add('platform-' + window.api.environment.platform);
				this._body.classList.add('theme-' + themeData.current);
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
