import log, {LogFunctions} from 'electron-log';

export class Logger implements LogFunctions {
	private _log: log.LogFunctions;

	constructor(scope: string) {
		log.transports.console.level = 'silly';
		log.transports.file.level = 'warn';
		log.transports.ipc.level = 'silly';
		this._log = log.scope(scope);
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
	verbose(...parameters: any[]): void {
		this._log.verbose(parameters);
	}
	debug(...parameters: any[]): void {
		this._log.debug(parameters);
	}
	silly(...parameters: any[]): void {
		this._log.silly(parameters);
	}

	/**
	 * Shortcut to info
	 */
	log(...parameters: any[]): void {
		this.info(parameters);
	}
}
