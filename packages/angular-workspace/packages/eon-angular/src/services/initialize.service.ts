import {Injectable} from '@angular/core';
import {CoreApiConst, CoreInitializeOutput} from '@bitmorest/eon-common';
import {ColorMode} from '../types';
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
		this._electron.receive<CoreInitializeOutput>(
			CoreApiConst.CORE_INITIALIZE,
			(initilizeData: CoreInitializeOutput) => {
				this._windowApiService.initilize(initilizeData.windowState);
				this._themeApiService.initialize(
					initilizeData.currentColorMode as ColorMode
				);
				this._languageApiService.initialize(initilizeData.currentLanguage);
			}
		);
		this._electron.send(CoreApiConst.CORE_INITIALIZE, {});
	}
}
