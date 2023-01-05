import {PreventableEmitter} from './preventable-emitter';

/**
 *
 */
export class PreventableEvent<T> {
	/**
	 *  @param value The value even emit
	 */
	public value: T;

	/**
	 * @internal
	 */
	protected _emitter: PreventableEmitter<T>;

	/**
	 *
	 * @param value the value
	 * @param emitter
	 */
	constructor(value: T, emitter: PreventableEmitter<T>) {
		this.value = value;
		emitter.isPrevented = false;
		this._emitter = emitter;
	}

	/**
	 * indicates this event should be not handled as default
	 */
	preventDefault() {
		this._emitter.isPrevented = true;
	}
}
