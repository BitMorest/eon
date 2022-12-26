import {CoreApiConst, ThemeApiInput, ThemeData} from '@bitmorest/eon-common';
import {Application, Window} from '../components';
import {Theme} from '../components/theme';
import {ApiService} from './api-service';

export class ThemeApiService extends ApiService<ThemeApiInput, ThemeData> {
	receptionChannel(): string {
		return CoreApiConst.THEME_API_INPUT;
	}

	sendingChannel(): string {
		return CoreApiConst.THEME_API_OUTPUT;
	}

	process(
		_app: Application,
		_window: Window,
		_input: ThemeApiInput
	): ThemeData {
		const themeManager = Theme.getInstance();

		if (_input.current) {
			if (themeManager.getThemes().includes(_input.current)) {
				themeManager.setTheme(_input.current);
			} else {
				throw new ReferenceError(
					`Theme "${_input.current}" is not registed yet!`
				);
			}
		}

		return {
			themes: themeManager.getThemes(),
			current: themeManager.getCurentTheme(),
		};
	}
}
