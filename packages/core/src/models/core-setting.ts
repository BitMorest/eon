import Store from 'electron-store';
import {Logger} from '../utils';
const log = new Logger('eon-core');

export type CoreSettingData = {
	darkMode: boolean;
	language: string;
};

export class CoreSetting {
	private static instance: CoreSetting;

	public static getInstance() {
		if (!CoreSetting.instance) {
			CoreSetting.instance = new CoreSetting();
		}
		return CoreSetting.instance;
	}

	private _settings: Store<CoreSettingData>;

	private constructor() {
		this._settings = new Store<CoreSettingData>({
			name: 'core-settings',
			beforeEachMigration: (_store, _context) => {
				log.info(
					`[Core Settings] migrate from ${_context.fromVersion} → ${_context.toVersion}`
				);
			},
			schema: {
				language: {
					type: 'string',
				},
				darkMode: {
					type: 'boolean',
				},
			},
			migrations: {
				'0.0.1': (_store) => {
					_store.set('darkMode', 'false');
				},
			},
		});
	}

	public isDarkMode(): boolean {
		return this._settings.get('darkMode');
	}

	public setDarkMode(isDarkMode: boolean) {
		this._settings.set('darkMode', isDarkMode);
	}

	public getCurentLanguage(): string {
		return this._settings.get('language');
	}

	public setLanguage(language: string) {
		this._settings.set('language', language);
	}
}
