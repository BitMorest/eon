import {Component} from '@angular/core';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
	appName: string;
	appVersion: string;
	platform: string;
	arch: string;

	constructor() {
		this.appName = (window as Window).application.name;
		this.appVersion = (window as Window).application.version;
		this.platform = (window as Window).application.platform.name;
		this.arch = (window as Window).application.platform.arch;
	}
}
