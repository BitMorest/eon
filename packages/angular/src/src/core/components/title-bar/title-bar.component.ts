import {Component, Inject, Input} from '@angular/core';
import {EonConfig, E_DIZZY_CONFIG} from '../../../types';

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
		class: 'titlebar d-flex',
	},
})
export class TitleBarComponent {
	@Input()
	public icon?: string;

	@Input()
	public title?: string;

	constructor(@Inject(E_DIZZY_CONFIG) private config: EonConfig) {
		this.title = config.titlebarTitle;
		this.icon = config.titlebarIcon;
	}
}
