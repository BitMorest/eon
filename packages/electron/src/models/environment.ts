import {Environment as EnvironmentInterface} from '@e-dizzy/types';

export class Environment implements EnvironmentInterface {
	public static load() {
		return new Environment();
	}

	public get env(): 'development' | 'production' | 'testing' {
		if (!process.env.NODE_ENV) {
			return 'development';
		} else if (
			['development', 'production', 'testing'].includes(process.env.NODE_ENV)
		) {
			return process.env.NODE_ENV as 'development' | 'production' | 'testing';
		} else {
			throw new Error(
				`NODE_ENV only acccept values is 'development' | 'production' | 'testing'`
			);
		}
	}

	public get platform(): string {
		return process.platform;
	}
}
