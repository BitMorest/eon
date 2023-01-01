import {Injectable} from '@angular/core';
import {
	CoreApiConst,
	LanguageApiInput,
	LanguageData,
} from '@bitmorest/eon-common';
import {
	BehaviorSubject,
	filter,
	first,
	map,
	Observer,
	SubscriptionLike,
} from 'rxjs';
import {ElectronService} from './electron.service';

@Injectable({
	providedIn: 'root',
})
export class LanguageApiService {
	_languageData = new BehaviorSubject<LanguageData | undefined>(undefined);

	constructor(
		private _electron: ElectronService,
	) {
		this._electron.receive<LanguageData>(
			CoreApiConst.LANGUAGE_API_OUTPUT,
			(languageData: LanguageData) => {
				this._languageData.next(languageData);
				// this._translateService.use(languageData.current);
			}
		);
	}

	public initialize(): Promise<void> {
		return new Promise<void>((resolve) => {
			this._languageData.pipe(first()).subscribe({next: (_value) => resolve});
			this._electron.send(CoreApiConst.LANGUAGE_API_INPUT, '');
		});
	}

	public subcribe(
		observerOrNext?:
			| Partial<Observer<LanguageData>>
			| ((value: LanguageData) => void)
	): SubscriptionLike {
		return this._languageData
			.pipe(filter((data) => data !== undefined))
			.pipe(map((data) => data as LanguageData))
			.subscribe(observerOrNext);
	}

	public changeLanguage(language: string) {
		this._electron.send<LanguageApiInput>(CoreApiConst.LANGUAGE_API_INPUT, {
			current: language,
		});
	}
}
