import {Component} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {Language, LanguageData} from '@bitmorest/eon-common';
import { LangDefinition, TranslocoService, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import {LanguageApiService} from '../../services/language-api.service';

@Component({
	selector: 'language-setting',
	templateUrl: './language-setting.component.html',
	styleUrls: ['./language-setting.component.scss'],
	// providers: [
	// 	{
	// 		provide: TRANSLOCO_SCOPE,
	// 		useValue: 'settings'
	// 	},
	// ]
})
export class LanguageSettingComponent{
	public languages: Array<{label: string, id: string}> = [];
	

	/**
	 * Current language
	 */
	public current = '';

	constructor(
		private translocoService: TranslocoService,
		private languageService: LanguageApiService
	) {
		console.log('Avaiable Languages', translocoService.getAvailableLangs());
		console.log('Default', translocoService.getDefaultLang());

		this.languages = translocoService.getAvailableLangs() as LangDefinition[];
		this.current = translocoService.getDefaultLang();


		// this.languageService.subcribe({
		// 	next: (languageData: LanguageData) => {
		// 		this.languages = languageData.languages;
		// 		this.current = languageData.current;

		// 		if (!this.current) {
		// 			// this.current = this.translate.defaultLang;
		// 		}

		// 		// this.translate.use(this.current);
		// 	},
		// });
	}

	

	changeLanguage(event: MatSelectChange) {
		this.translocoService.setActiveLang(event.value);

		// this.languageService.changeLanguage(event.value);
	}
}
