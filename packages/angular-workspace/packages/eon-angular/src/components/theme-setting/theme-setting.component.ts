import {Component} from '@angular/core';
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

	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	changeTheme(event: any) {
		if (event.target.value) this.themeService.changeTheme(event.target.value);
	}
}
