import {
	Component,
	HostBinding,
	HostListener,
	Input,
	OnInit,
} from '@angular/core';
import {WindowAction} from '@bitmorest/eon-common';
import {WindowActionClickEventService} from '../../public-api';
import {WindowApiService} from '../../services/window-api.service';

export type WindowActionEventData = {
	action: WindowAction;
};

@Component({
	selector: 'window-button',
	template: '<ng-content></ng-content>',
	styleUrls: ['window-button.component.scss'],
})
export class WindowButtonComponent implements OnInit {
	@Input()
	public action!: WindowAction;

	@Input()
	@HostBinding('class.disabled')
	public disabled?: boolean = false;

	@HostBinding()
	public class?: string;

	/**
	 * Prevent default output click event
	 * @internal
	 */
	private click?: undefined;

	constructor(
		private actionEventService: WindowActionClickEventService,
		private windowApiService: WindowApiService
	) {}

	ngOnInit(): void {
		this.class = this.action;
	}

	@HostListener('click')
	onButtonClick() {
		// skip if button is disabled
		if (this.disabled) return;

		const shouldDefaultProcess = this.actionEventService.emit({
			action: this.action,
		});
		if (shouldDefaultProcess) {
			this.windowApiService.doAction(this.action);
		}
	}
}
