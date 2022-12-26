import {PartialObserver, SubscriptionLike} from 'rxjs';
import {PreventableEmitter} from './preventable-emitter';
import {PreventableEvent} from './preventable-event';

export class PreventableEventService<T> {
	/**
	 * @internal
	 */
	private _emitter;

	/**
	 * Create new instance
	 */
	constructor() {
		this._emitter = new PreventableEmitter<T>();
	}

	/**
	 * Emit the event with data
	 *
	 * @param data
	 * @returns whether this event should be handled as default or not? true is shhoul process as the default
	 */
	emit(data: T): boolean {
		const event = new PreventableEvent<T>(data, this._emitter);
		this._emitter.emit(event);
		return !this._emitter.isPrevented;
	}

	/**
	 * Registers handlers for events emitted by this instance.
	 * @param next When supplied, a custom handler for emitted events.
	 * @param error When supplied, a custom handler for an error notification from this emitter.
	 * @param complete When supplied, a custom handler for a completion notification from this
	 *     emitter.
	 */
	subscribe(observer?: PartialObserver<T>): SubscriptionLike {
		return this._emitter.subscribe(observer);
	}
}
