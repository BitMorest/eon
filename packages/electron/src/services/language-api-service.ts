import {
	CoreApiConst,
	LanguageInput as In,
	LanguageOutput as Out,
} from '@e-dizzy/types';
import {Application} from '../components/application';
import {Window} from '../components/window';
import {CoreSetting} from '../models/core-setting';
import {ApiService} from './api-service';

export class LanguageApiService extends ApiService<In, Out> {
	booting(_app: Application, _window: Window): void {
		/* eslint-disable @typescript-eslint/no-empty-function */
	}

	receptionChannel(): string {
		return CoreApiConst.LANGUAGE;
	}

	sendingChannel(): string {
		return CoreApiConst.LANGUAGE;
	}

	process(_app: Application, _window: Window, _input: In): Out {
		if (_input.currentLanguage) {
			CoreSetting.getInstance().setLanguage(_input.currentLanguage);
		}
		return {
			currentLanguage: this.getCurrentLanguage(),
		};
	}

	getCurrentLanguage() {
		return CoreSetting.getInstance().getCurentLanguage();
	}
}
