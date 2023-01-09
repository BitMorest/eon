import {Application} from '@e-dizzy/electron';
import {enviroments} from './enviroments';
import {MultiplesApiService} from './multiples-service';

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const windowOptions = {
	width: 868,
	height: 568,
	frame: false,
	transparent: true,
};

Application
	// Create application
	.create(windowOptions, enviroments)
	// Add Api Services
	.addApiService(new MultiplesApiService())
	// And run it
	.run();

export class A {}
