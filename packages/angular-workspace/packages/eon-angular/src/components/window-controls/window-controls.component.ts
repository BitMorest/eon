import {Component} from '@angular/core';
import {WindowState} from '@bitmorest/eon-common';
import {WindowApiService} from '../../services/window-api.service';

@Component({
	selector: 'window-controls',
	template: `
		<window-button [disabled]="!state?.isMinimizable" action="minimize">
			<mat-icon>minimize</mat-icon>
		</window-button>
		<window-button [disabled]="!state?.isMaximiable" action="toogleMaximize">
			<mat-icon *ngIf="!state?.isMaximized">crop_din</mat-icon>
			<mat-icon *ngIf="state?.isMaximized">filter_none</mat-icon>
		</window-button>
		<window-button action="close">
			<mat-icon>close</mat-icon>
		</window-button>
	`,
	styleUrls: ['window-controls.component.scss'],
	host: {
		class: `d-flex align-items-center h-100`,
	},
})
export class WindowControlsComponent {
	public state?: WindowState;

	constructor(private windowApiService: WindowApiService) {
		this.windowApiService.getState().subscribe({
			next: (state) => {
				this.state = state;
			},
		});
	}
}
