export type Environment = {
	platform: string;
	env: 'development' | 'production' | 'testing';
};

export type WindowState = {
	isMaximized: boolean;
	isMaximiable: boolean;
	isMinimizable: boolean;
};

export class CoreApiConst {
	static readonly INITIALIZE = 'CoreInitilize';
	static readonly WINDOW_STATE = 'CoreWindowState';
	static readonly UI_MODE = 'CoreUIMode';
	static readonly LANGUAGE = 'CoreLanguage';
}

export type InitializeOutput = {
	applicationName: string;
	applicationVersion: string;
	isDarkMode: boolean;
	currentLanguage: string;
	windowState: WindowState;
};

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
