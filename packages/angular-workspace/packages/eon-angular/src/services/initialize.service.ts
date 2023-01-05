import {Injectable} from '@angular/core';
import {CoreApiConst, InitializeOutput} from '@bitmorest/eon-common';
import {ElectronService} from './electron.service';
import {LanguageApiService} from './language-api.service';
import {UIModeService} from './ui-mode.service';
import {BrowserWindowService} from './browser-window.service';

@Injectable({
	providedIn: 'root',
})
export class InitializeService {
	constructor(
		private _electron: ElectronService,
		private _windowApiService: BrowserWindowService,
		private _languageApiService: LanguageApiService,
		private _uiApiService: UIModeService
	) {
		console.log('[Eon]-------------------');
		console.log('[Eon] Initializing...');
		if (window && (window as Window).api) {
			console.log('[Eon] Enviroments:', window.api.environment);
			this._electron.receive<InitializeOutput>(
				CoreApiConst.INITIALIZE,
				(initilizeData: InitializeOutput) => {
					this._windowApiService.initilize(initilizeData.windowState);
					this._uiApiService.initialize(initilizeData.isDarkMode);
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
