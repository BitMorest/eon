export interface Dictionary<T> {
	[Key: string]: T;
}

export interface EnvironmentsConfig<T extends EnvironmentConfig> {
	development: T;
	production: T;
	testing: T;
}

export interface EnvironmentConfig extends Dictionary<unknown> {
	debug?: DebugOptions;
}

export interface Environment extends EnvironmentConfig {
	name: 'development' | 'production' | 'testing';
}

export interface DebugOptions {
	devTools?: boolean;
	inspectElementMenu?: boolean;
}

export type AppInfo = {
	name: string;
	version: string;
};

export type WindowState = {
	isMaximized: boolean;
	isMaximiable: boolean;
	isMinimizable: boolean;
};

export class CoreApiConst {
	static readonly WINDOW_STATE = 'CoreWindowState';
	static readonly UI_MODE = 'CoreUIMode';
	static readonly LANGUAGE = 'CoreLanguage';
}

export type WindowAction = 'minimize' | 'close' | 'toogleMaximize';

export type CoreWindowStateInput = {
	action?: WindowAction;
	windowState?: Partial<Omit<WindowState, 'isMaximized'>>;
};

export type CoreWindowStateOutput = WindowState;

export type ColorModeInput = {
	isDarkMode: boolean;
};

export type ColorModeOutput = {
	isDarkMode: boolean;
};

export type LanguageInput = {
	currentLanguage: string;
};

export type LanguageOutput = {
	currentLanguage: string;
};
