import {Injectable} from '@angular/core';
import {CoreApiConst, WindowState, WindowAction} from '@bitmorest/eon-common';
import {BehaviorSubject, SubscriptionLike} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {ObserverOrNext} from '../../types';
import {ElectronService} from './electron.service';

@Injectable({providedIn: 'root'})
export class BrowserWindowService {
	_windowState = new BehaviorSubject<WindowState | undefined>(undefined);

	constructor(private _electron: ElectronService) {
		_electron.receive<WindowState>(
			CoreApiConst.WINDOW_STATE,
			(windowState: WindowState) => {
				this._windowState.next(windowState);
			}
		);
	}

	public initilize(state: WindowState) {
		this._windowState.next(state);
	}

	public subscribe(
		observerOrNext?: ObserverOrNext<WindowState>
	): SubscriptionLike {
		return this._windowState
			.pipe(filter((state) => state !== undefined))
			.pipe(map((state) => state as WindowState))
			.subscribe(observerOrNext);
	}

	public doAction(action: WindowAction) {
		this._electron.send(CoreApiConst.WINDOW_STATE, {action});
	}
}
