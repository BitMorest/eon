import {Component, Input} from '@angular/core';

@Component({
	selector: 'titlebar',
	template: `
		<window-controls class="macos"></window-controls>
		<div class="title flex-grow-1">
			<img class="icon" src="{{ icon }}" *ngIf="icon" />
			<div class="text">{{ title }}</div>
		</div>
		<window-controls class="windows"></window-controls>
	`,
	styleUrls: ['./title-bar.component.scss'],
	host: {
		class: 'd-flex',
	},
})
export class TitleBarComponent {
	@Input()
	public icon?: string =
		'https://cdn.iconscout.com/icon/free/png-256/kik-4-722711.png';

	@Input()
	public title?: string = 'Demo Application';
}
