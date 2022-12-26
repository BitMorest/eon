import Store from 'electron-store';
import {Logger} from '../utils';
const log = new Logger('eon-core');

export class Theme {
	private static instance: Theme;

	public static getInstance() {
		if (!Theme.instance) {
			Theme.instance = new Theme();
		}
		return Theme.instance;
	}

	private themeConfig: Store<{theme: string}>;

	private themes: Array<string> = ['light', 'dark'];

	private constructor() {
		this.themeConfig = new Store<{theme: string}>({
			name: 'theme',
			beforeEachMigration: (_store, _context) => {
				log.info(
					`[themeConfig] migrate from ${_context.fromVersion} → ${_context.toVersion}`
				);
			},
			schema: {
				theme: {
					type: 'string',
				},
			},
			migrations: {
				'0.0.1': (_store) => {
					_store.set('theme', 'light');
				},
			},
		});
	}

	public getCurentTheme(): string {
		return this.themeConfig.get('theme');
	}

	public setTheme(theme: string) {
		this.themeConfig.set('theme', theme);
	}

	public getThemes(): Array<string> {
		return this.themes;
	}
}
