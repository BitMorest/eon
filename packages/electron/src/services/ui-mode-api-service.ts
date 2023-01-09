import {
	CoreApiConst,
	ColorModeInput as In,
	ColorModeOutput as Out,
} from '@e-dizzy/types';
import {Application} from '../components/application';
import {Window} from '../components/window';
import {CoreSetting} from '../models/core-setting';
import {ApiService} from './api-service';

export class UiModeApiService extends ApiService<In, Out> {
	booting(_app: Application, _window: Window): void {
		/* eslint-disable @typescript-eslint/no-empty-function */
	}

	receptionChannel(): string {
		return CoreApiConst.UI_MODE;
	}

	sendingChannel(): string {
		return CoreApiConst.UI_MODE;
	}

	process(_app: Application, _window: Window, _input: In): Out {
		CoreSetting.getInstance().setDarkMode(_input.isDarkMode);
		return {
			isDarkMode: this.isDarkMode(),
		};
	}

	isDarkMode() {
		return CoreSetting.getInstance().isDarkMode();
	}
}
