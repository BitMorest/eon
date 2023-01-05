import {CoreApiConst, InitializeOutput as Out} from '@e-dizzy/types';
import {Application, Window} from '../components';
import {ApiService} from './api-service';
import {LanguageApiService} from './language-api-service';
import {UiModeApiService} from './ui-mode-api-service';
import {WindowApiService} from './window-api-service';

export class InitializeApiService extends ApiService<unknown, Out> {
	receptionChannel(): string {
		return CoreApiConst.INITIALIZE;
	}

	sendingChannel(): string {
		return CoreApiConst.INITIALIZE;
	}

	process(_app: Application, _window: Window, _input: unknown): Out {
		const uiModeApiService = new UiModeApiService();
		const langApiService = new LanguageApiService();
		const winApiService = new WindowApiService();
		return {
			isDarkMode: uiModeApiService.isDarkMode(),
			currentLanguage: langApiService.getCurrentLanguage(),
			windowState: winApiService.getWindowState(_window),
		};
	}
}
