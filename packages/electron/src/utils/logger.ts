import log from 'electron-log';

export class Logger {
	private _log: log.LogFunctions;

	constructor(scope = 'app') {
		this._log = log.scope(scope);
		log.transports.file.level = 'info';
		log.transports.console.level = 'info';
	}

	error(...parameters: any[]): void {
		this._log.error(parameters);
	}

	warn(...parameters: any[]): void {
		this._log.warn(parameters);
	}

	info(...parameters: any[]): void {
		this._log.info(parameters);
	}
}
