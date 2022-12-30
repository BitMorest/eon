import {
	CoreApiConst,
	LanguageApiInput,
	LanguageData,
} from '@bitmorest/eon-common';
import {Application, Window} from '../components';
import {Language} from '../components/language';
import {ApiService} from './api-service';

export class LanguageApiService extends ApiService<
	LanguageApiInput,
	LanguageData
> {
	receptionChannel(): string {
		return CoreApiConst.LANGUAGE_API_INPUT;
	}

	sendingChannel(): string {
		return CoreApiConst.LANGUAGE_API_OUTPUT;
	}

	process(
		_app: Application,
		_window: Window,
		_input: LanguageApiInput
	): LanguageData {
		const languageManager = Language.getInstance();

		if (_input.current) {
			if (
				languageManager
					.getLanguages()
					.map((l) => l.symbol)
					.includes(_input.current)
			) {
				languageManager.setLanguage(_input.current);
			} else {
				throw new ReferenceError(
					`Language "${_input.current}" is not registed yet!`
				);
			}
		}

		return {
			languages: languageManager.getLanguages(),
			current: languageManager.getCurentLanguage(),
		};
	}
}
