import {Application} from '@bitmorest/eon-core';
import {MultiplesApiService} from './multiples-service';

Application
	// Create application
	.create({
		width: 868,
		height: 568,
		frame: false,
		transparent: true,
		hasShadow: true,
	})
	// Add Api Services
	.addApiService(new MultiplesApiService())
	// And run it
	.run();

export class A {}
