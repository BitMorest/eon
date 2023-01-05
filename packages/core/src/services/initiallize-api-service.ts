import {
	CoreApiConst,
	CoreInitializeInput as In,
	CoreInitializeOutput as Out,
} from '@bitmorest/eon-common';
import {Application, Window} from '../components';
import {ApiService} from './api-service';
import {LanguageApiService} from './language-api-service';
import {ThemeApiService} from './theme-api-service';
import {WindowApiService} from './window-api-service';

export class InitializeApiService extends ApiService<In, Out> {
	receptionChannel(): string {
		return CoreApiConst.CORE_INITIALIZE;
	}

	sendingChannel(): string {
		return CoreApiConst.CORE_INITIALIZE;
	}

	process(_app: Application, _window: Window, _input: In): Out {
		const themeApiService = new ThemeApiService();
		const langApiService = new LanguageApiService();
		const winApiService = new WindowApiService();

		return {
			currentColorMode: themeApiService.process(_app, _window).currentColorMode,
			currentLanguage: langApiService.process(_app, _window).currentLanguage,
			windowState: winApiService.process(_app, _window),
		};
	}
}
