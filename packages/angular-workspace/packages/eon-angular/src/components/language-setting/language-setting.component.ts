import {Component, Input, OnInit} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {Language, LanguageData} from '@bitmorest/eon-common';
import {TranslateService} from '@ngx-translate/core';
import {LanguageApiService} from '../../services/language-api.service';

@Component({
	selector: 'language-setting',
	templateUrl: './language-setting.component.html',
	styleUrls: ['./language-setting.component.scss'],
})
export class LanguageSettingComponent implements OnInit {
	@Input()
	public languages: Array<Language> = [];

	// /**
	//  * Current theme
	//  */
	public current = '';

	constructor(
		private translate: TranslateService,
		private languageService: LanguageApiService
	) {
		this.languageService.subcribe({
			next: (languageData: LanguageData) => {
				this.languages = languageData.languages;
				this.current = languageData.current;

				if (!this.current) {
					this.current = this.translate.defaultLang;
				}

				this.translate.use(this.current);

				// console.log('Language Data', languageData);
			},
		});
	}

	ngOnInit(): void {
		// console.log('Default Lang', this.translate.defaultLang);
		// console.log('Current Lang', this.translate.currentLang);
	}

	changeLanguage(event: MatSelectChange) {
		this.languageService.changeLanguage(event.value);
	}
}
