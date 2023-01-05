import {
	CoreApiConst,
	ColorModeInput as In,
	ColorModeOutput as Out,
} from '@e-dizzy/types';
import {Application, Window} from '../components';
import {CoreSetting} from '../models/core-setting';
import {ApiService} from './api-service';

export class UiModeApiService extends ApiService<In, Out> {
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
