import {Application} from '@bitmorest/eon-core';
import {MultiplesApiService} from './multiples-service';

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

Application
	// Create application
	.create({width: 868, height: 568, frame: false, transparent: true})
	// Add Api Services
	.addApiService(new MultiplesApiService())
	// And run it
	.run();

export class A {}
