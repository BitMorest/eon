import {Injectable} from '@angular/core';
import {CoreApiConst, WindowState, WindowAction} from '@bitmorest/eon-common';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, first, map} from 'rxjs/operators';
import {ElectronService} from './electron.service';

@Injectable({providedIn: 'root'})
export class WindowApiService {
	state = new BehaviorSubject<WindowState | undefined>(undefined);

	constructor(private _electron: ElectronService) {
		_electron.receive<WindowState>(
			CoreApiConst.WINDOW_API_OUTPUT,
			(windowState: WindowState) => {
				this.state.next(windowState);
			}
		);
	}

	public initialize(): Promise<void> {
		return new Promise<void>((resolve) => {
			this.state.pipe(first()).subscribe({next: (_value) => resolve});
			this._electron.send(CoreApiConst.WINDOW_API_INPUT, '');
		});
	}

	public getState(): Observable<WindowState> {
		return this.state
			.pipe(filter((state) => state !== undefined))
			.pipe(map((state) => state as WindowState));
	}

	public doAction(action: WindowAction) {
		this._electron.send(CoreApiConst.WINDOW_API_INPUT, {action});
	}
}
