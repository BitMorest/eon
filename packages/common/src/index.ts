export type Environment = {
	platform: string;
	env: 'development' | 'production' | 'testing';
};

export class CoreApiConst {
	static readonly CORE_INITIALIZE = 'CoreInitilizeChannel';
	static readonly WINDOW_STATE = 'WindowStateChannel';
	static readonly THEME_COLOR_MODE_STATE = 'ThemeColorModeChannel';
	static readonly LANGUAGE_STATE = 'ThemeColorModeChannel';
}

export type WindowState = {
	isMaximized: boolean;
	isMaximiable: boolean;
	isMinimizable: boolean;
};

export type CoreInitializeInput = {
	currentColorMode: string;
	currentLanguage: string;
	windowState?: Partial<WindowState>;
};

export type CoreInitializeOutput = {
	currentColorMode: string;
	currentLanguage: string;
	windowState: WindowState;
};

export type WindowAction = 'minimize' | 'close' | 'toogleMaximize';

export type CoreWindowStateInput = {
	action?: WindowAction;
	windowState?: Partial<WindowState>;
};

export type CoreWindowStateOutput = WindowState;

export type ThemeColorModeInput = {
	currentColorMode: string;
};

export type ThemeColorModeOutput = {
	currentColorMode: string;
};

export type LanguageModeInput = {
	currentLanguage: string;
};

export type LanguageModeOutput = {
	currentLanguage: string;
};
