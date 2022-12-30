import {Component, Input, OnInit} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {Language} from '@bitmorest/eon-common';
import {TranslateService} from '@ngx-translate/core';

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

	constructor(private translate: TranslateService) {}

	ngOnInit(): void {
		console.log('Default Lang', this.translate.defaultLang);
		console.log('Current Lang', this.translate.currentLang);
	}

	changeLanguage(event: MatSelectChange) {
		this.translate.use(event.value);
	}
}
