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
		return CoreApiConst.THEME_COLOR_MODE;
	}

	sendingChannel(): string {
		return CoreApiConst.THEME_COLOR_MODE;
	}

	process(_app: Application, _window: Window, _input: In): Out {
		const themeManager = Theme.getInstance();
		themeManager.setTheme(_input.currentColorMode);
		return {
			currentColorMode: this.getCurrentColorMode(),
		};
	}

	getCurrentColorMode() {
		return Theme.getInstance().getCurentTheme();
	}
}
