import {EventEmitter} from '@angular/core';
import {PreventableEvent} from './preventable-event';

/**
 *
 *
 * ```
 * @HostListener("click")
 * onClickHandler() {
 *
 *		this.onClick.emit(new PreventableEvent<string>(data, this.onClick));
 *
 *		if (!this.onClick.isPrevented) {
 *			// do the default event process
 *		}
 *
 *	}
 * ```
 */
export class PreventableEmitter<T> extends EventEmitter<PreventableEvent<T>> {
	/**
	 * Indicates whether this event should be handled as default or not?
	 */
	isPrevented = true;

	/**
	 * Override EventEmmiter constructor for make PreventableEmitter always is an instance of
	 * EventEmitter synchonius
	 */
	constructor() {
		super(false);
	}
}
