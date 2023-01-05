import {Component} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {UIModeService, LanguageApiService} from '@bitmorest/eon-angular';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
	public languages: Array<{label: string; id: string}>;
	public currentThemes = '';
	public currentLanguage = '';

	constructor(
		private uiModeService: UIModeService,
		private languageService: LanguageApiService
	) {
		this.languages = languageService.avaiableLanguages;
		this.languageService.subcribe((language: string) => {
			this.currentLanguage = language;
		});
	}

	onChangeLanguage(event: MatSelectChange) {
		this.languageService.changeLanguage(event.value);
	}

	onColorModeChange(event: MatSlideToggleChange) {
		this.uiModeService.changeColorMode(event.checked);
	}
}
