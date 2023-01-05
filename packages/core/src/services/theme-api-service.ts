import {
	CoreApiConst,
	ThemeColorModeInput as In,
	ThemeColorModeOutput as Out,
} from '@bitmorest/eon-common';
import {Application, Window} from '../components';
import {Theme} from '../models/theme';
import {ApiService} from './api-service';

export class ThemeApiService extends ApiService<In, Out> {
	receptionChannel(): string {
		return CoreApiConst.THEME_COLOR_MODE_STATE;
	}

	sendingChannel(): string {
		return CoreApiConst.THEME_COLOR_MODE_STATE;
	}

	process(_app: Application, _window: Window, _input: In): Out {
		const themeManager = Theme.getInstance();
		themeManager.setTheme(_input.currentColorMode);
		return {
			currentColorMode: themeManager.getCurentTheme(),
		};
	}
}
