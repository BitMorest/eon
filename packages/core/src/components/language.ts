import {Language as LanguageModel} from '@bitmorest/eon-common';
import Store from 'electron-store';
import {Logger} from '../utils';
const log = new Logger('eon-core');

export class Language {
	private static instance: Language;

	public static getInstance() {
		if (!Language.instance) {
			Language.instance = new Language();
		}
		return Language.instance;
	}

	private languageConfig: Store<{language: string}>;
	private languages: Array<LanguageModel> = [];

	private constructor() {
		this.languageConfig = new Store<{language: string}>({
			name: 'language',
			beforeEachMigration: (_store, _context) => {
				log.info(
					`[languageConfig] migrate from ${_context.fromVersion} → ${_context.toVersion}`
				);
			},
			schema: {
				language: {
					type: 'string',
				},
			},
			migrations: {
				'0.0.1': (_store) => {
					// do not thing
				},
			},
		});
	}

	public registerSupportLanguages(languages: Array<LanguageModel>) {
		this.languages = languages;
	}

	public getLanguages(): Array<LanguageModel> {
		return this.languages;
	}

	public getCurentLanguage(): string {
		return this.languageConfig.get('language');
	}

	public setLanguage(language: string) {
		this.languageConfig.set('language', language);
	}
}
