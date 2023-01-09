import {EnvironmentsConfig, EnvironmentConfig} from '@e-dizzy/types';

export const enviroments: EnvironmentsConfig<EnvironmentConfig> = {
	development: {
		debug: {
			devTools: true,
			inspectElementMenu: true,
		},
		test: 'env',
	},
	production: {},
	testing: {},
};
