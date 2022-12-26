export type Environment = {
	env: 'development' | 'production' | 'testing';
	platform: string;
};

export type WindowAction = 'minimize' | 'toogleMaximize' | 'close';
export type WindowState = {
	isMaximized: boolean;
	isMaximiable: boolean;
	isMinimizable: boolean;
};
export type WindowApiInput = {
	action?: WindowAction;
};
export type ThemeApiInput = {
	current?: string;
};
export type ThemeData = {
	themes: Array<string>;
	current: string;
};
export class CoreApiConst {
	static readonly WINDOW_API_INPUT = 'WindowApiInput';
	static readonly WINDOW_API_OUTPUT = 'WindowApiOuput';
	static readonly THEME_API_INPUT = 'ThemeApiInput';
	static readonly THEME_API_OUTPUT = 'ThemeApiOuput';
}
