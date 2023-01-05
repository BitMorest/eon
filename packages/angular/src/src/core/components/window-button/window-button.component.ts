import {
	Component,
	HostBinding,
	HostListener,
	Input,
	OnInit,
} from '@angular/core';
import {WindowAction} from '@e-dizzy/types';
import {WindowActionClickEventService} from '../../services/events/window-action-click-event.service';
import {BrowserWindowService} from '../../services/browser-window.service';

export type WindowActionEventData = {
	action: WindowAction;
};

@Component({
	selector: 'window-button',
	template: '<ng-content></ng-content>',
	styleUrls: ['window-button.component.scss'],
	host: {
		class: 'window-button d-flex align-items-center justify-content-center',
	},
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
		private windowApiService: BrowserWindowService
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
