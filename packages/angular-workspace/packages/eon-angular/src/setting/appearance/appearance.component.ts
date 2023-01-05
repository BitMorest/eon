import {Component} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {LanguageApiService} from '../../core/services/language-api.service';
import {UIModeService} from '../../core/services/ui-mode.service';

@Component({
	selector: 'appearance-settings',
	templateUrl: './appearance.component.html',
	styleUrls: ['./appearance.component.scss'],
})
export class AppearanceComponent {
	public languages: Array<{label: string; id: string}>;
	public isDarkMode = false;
	public currentLanguage = '';

	constructor(
		private uiModeService: UIModeService,
		private languageService: LanguageApiService
	) {
		this.languages = languageService.avaiableLanguages;
		this.languageService.subcribe((language: string) => {
			console.log(language);
			this.currentLanguage = language;
		});

		this.uiModeService.subcribe((isDarkMode: boolean) => {
			console.log(isDarkMode);
			this.isDarkMode = isDarkMode;
		});
	}

	onChangeLanguage(event: MatSelectChange) {
		this.languageService.changeLanguage(event.value);
	}

	onColorModeChange(event: MatSlideToggleChange) {
		this.uiModeService.changeColorMode(event.checked);
	}
}
