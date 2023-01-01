import {Component} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {Language, LanguageData} from '@bitmorest/eon-common';
import { TranslocoService } from '@ngneat/transloco';
import {LanguageApiService} from '../../services/language-api.service';

@Component({
	selector: 'language-setting',
	templateUrl: './language-setting.component.html',
	styleUrls: ['./language-setting.component.scss'],
})
export class LanguageSettingComponent{
	public languages: Array<Language> = [];

	/**
	 * Current language
	 */
	public current = '';

	constructor(
		private translocoService: TranslocoService,
		private languageService: LanguageApiService
	) {
		this.languageService.subcribe({
			next: (languageData: LanguageData) => {
				this.languages = languageData.languages;
				this.current = languageData.current;

				if (!this.current) {
					// this.current = this.translate.defaultLang;
				}

				// this.translate.use(this.current);
			},
		});
	}

	

	changeLanguage(event: MatSelectChange) {
		this.languageService.changeLanguage(event.value);
	}
}
