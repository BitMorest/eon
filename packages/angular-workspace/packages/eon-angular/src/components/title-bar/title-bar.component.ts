import {Component, Inject, Input} from '@angular/core';
import { EonConfig, EON_CONFIG } from '../../config';

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
	public icon?: string =
		'https://code.visualstudio.com/assets/apple-touch-icon.png';

	@Input()
	public title?: string = 'Demo Application';

	constructor(@Inject(EON_CONFIG) private config: EonConfig){

		console.log(config);

	}
}
