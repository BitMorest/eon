import {Component} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {ThemeApiService, LanguageApiService} from '@bitmorest/eon-angular';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
	public themes: Array<string> = [];
	public languages: Array<{label: string; id: string}>;

	public currentThemes = '';
	public currentLanguage = '';

	constructor(
		private themeService: ThemeApiService,
		private languageService: LanguageApiService
	) {
		this.languages = languageService.avaiableLanguages;
		this.languageService.subcribe((language) => {
			this.currentLanguage = language;
		});
	}

	onChangeLanguage(event: MatSelectChange) {
		this.languageService.changeLanguage(event.value);
	}
}
