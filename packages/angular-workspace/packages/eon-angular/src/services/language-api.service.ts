import {Injectable} from '@angular/core';
import {
	CoreApiConst,
	LanguageModeInput,
	LanguageModeOutput,
} from '@bitmorest/eon-common';
import {TranslocoService} from '@ngneat/transloco';
import {ElectronService} from './electron.service';

@Injectable({
	providedIn: 'root',
})
export class LanguageApiService {
	constructor(
		private _electron: ElectronService,
		private _translateService: TranslocoService
	) {
		this._electron.receive<LanguageModeOutput>(
			CoreApiConst.LANGUAGE_STATE,
			(response: LanguageModeOutput) => {
				if (response.currentLanguage) {
					this._translateService.setActiveLang(response.currentLanguage);
				}
			}
		);
	}

	public initialize(currentLanguage?: string) {
		if (currentLanguage) {
			this._translateService.setActiveLang(currentLanguage);
		}
	}

	public changeLanguage(currentLanguage: string) {
		const data = {currentLanguage};
		this._electron.send<LanguageModeInput>(CoreApiConst.LANGUAGE_STATE, data);
	}
}
