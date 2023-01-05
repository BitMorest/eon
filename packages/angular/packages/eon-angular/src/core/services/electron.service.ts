import {Injectable, NgZone} from '@angular/core';
import {WindowApi} from '../../types';

@Injectable({providedIn: 'root'})
export class ElectronService {
	private _api!: WindowApi;

	constructor(private _zone: NgZone) {
		this._api = (window as Window).api;
	}

	public receive<Out>(channel: string, callback: (output: Out) => void): void {
		if (this._api) {
			this._api.receive<Out>(channel, (output: Out) => {
				console.log(`Received from main process channel [${channel}]`, output);

				// Next code might run outside of Angular zone and therefore Angular
				// doesn't recognize it needs to run change detection
				// Further details on SO : https://stackoverflow.com/a/49136353/11480016
				this._zone.run(() => {
					callback(output);
				});
			});
		}
	}

	public send<In>(channel: string, input?: In): void {
		if (this._api) {
			console.log(`Sending to main process channel [${channel}]`, input);
			this._api.send<In>(channel, input);
		}
	}
}
