import {
	CoreApiConst,
	LanguageModeInput as In,
	LanguageModeOutput as Out,
} from '@bitmorest/eon-common';
import {Application, Window} from '../components';
import {Language} from '../models/language';
import {ApiService} from './api-service';

export class LanguageApiService extends ApiService<In, Out> {
	receptionChannel(): string {
		return CoreApiConst.LANGUAGE;
	}

	sendingChannel(): string {
		return CoreApiConst.LANGUAGE;
	}

	process(_app: Application, _window: Window, _input: In): Out {
		const languageManager = Language.getInstance();
		if (_input.currentLanguage) {
			languageManager.setLanguage(_input.currentLanguage);
		}
		return {
			currentLanguage: this.getCurrentLanguage(),
		};
	}

	getCurrentLanguage() {
		return Language.getInstance().getCurentLanguage();
	}
}
