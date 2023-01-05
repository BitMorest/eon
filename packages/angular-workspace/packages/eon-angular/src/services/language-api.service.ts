import {Injectable} from '@angular/core';
import {
	CoreApiConst,
	LanguageInput,
	LanguageOutput,
} from '@bitmorest/eon-common';
import {LangDefinition, TranslocoService} from '@ngneat/transloco';
import {BehaviorSubject, SubscriptionLike} from 'rxjs';
import {ObserverOrNext} from '../types';
import {ElectronService} from './electron.service';

@Injectable({
	providedIn: 'root',
})
export class LanguageApiService {
	public avaiableLanguages: Array<{label: string; id: string}>;
	private _currentLanguage = new BehaviorSubject<string>('en');

	constructor(
		private _electron: ElectronService,
		private _translateService: TranslocoService
	) {
		this.avaiableLanguages =
			_translateService.getAvailableLangs() as LangDefinition[];
		this._electron.receive<LanguageOutput>(
			CoreApiConst.LANGUAGE,
			(response: LanguageOutput) => {
				if (response.currentLanguage) {
					this._translateService.setActiveLang(response.currentLanguage);
					this._currentLanguage.next(response.currentLanguage);
				}
			}
		);
	}

	public initialize(currentLanguage?: string) {
		if (currentLanguage) {
			this._translateService.setActiveLang(currentLanguage);
		}
	}

	public subcribe(observerOrNext?: ObserverOrNext<string>): SubscriptionLike {
		return this._currentLanguage.subscribe(observerOrNext);
	}

	public changeLanguage(currentLanguage: string) {
		const data = {currentLanguage};
		this._electron.send<LanguageInput>(CoreApiConst.LANGUAGE, data);
	}
}
