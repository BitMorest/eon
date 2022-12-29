import {Component} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {ThemeApiService} from '../../services/theme-api.service';

@Component({
	selector: 'theme-setting',
	templateUrl: './theme-setting.component.html',
	styleUrls: ['./theme-setting.component.scss'],
})
export class ThemeSettingComponent {
	/**
	 * List all avaiable themes
	 */
	public themes: Array<string> = [];

	/**
	 * Current theme
	 */
	public current = '';

	constructor(private themeService: ThemeApiService) {
		this.themeService.subcribe({
			next: (themeData) => {
				this.themes = themeData.themes;
				this.current = themeData.current;
			},
		});
	}

	changeTheme(event: MatSelectChange) {
		this.themeService.changeTheme(event.value);
	}
}
