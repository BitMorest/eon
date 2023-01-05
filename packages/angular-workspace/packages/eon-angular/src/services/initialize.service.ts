import {Injectable} from '@angular/core';
import {CoreApiConst, CoreInitializeOutput} from '@bitmorest/eon-common';
import {ElectronService} from './electron.service';
import {LanguageApiService} from './language-api.service';
import {ThemeApiService} from './theme-api.service';
import {WindowApiService} from './window-api.service';

@Injectable({
	providedIn: 'root',
})
export class InitializeService {
	constructor(
		private _electron: ElectronService,
		private _windowApiService: WindowApiService,
		private _languageApiService: LanguageApiService,
		private _themeApiService: ThemeApiService
	) {
		console.log('[Eon]-------------------');
		console.log('[Eon] Initializing...');
		if (window && (window as Window).api) {
			console.log('[Eon] Enviroments:', window.api.environment);
			this._electron.receive<CoreInitializeOutput>(
				CoreApiConst.INITIALIZE,
				(initilizeData: CoreInitializeOutput) => {
					this._windowApiService.initilize(initilizeData.windowState);
					this._themeApiService.initialize(initilizeData.currentColorMode);
					this._languageApiService.initialize(initilizeData.currentLanguage);
					console.log('[Eon] Initializing done!!!');
					console.log('[Eon] -------------------\n\n');
				}
			);
			this._electron.send(CoreApiConst.INITIALIZE);
		} else {
			console.error('[Eon] Preloader API is not loaded');
		}
	}
}
