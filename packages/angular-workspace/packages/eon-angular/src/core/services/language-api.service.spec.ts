import {TestBed} from '@angular/core/testing';

import {LanguageApiService} from './language-api.service';

describe('LanguageApiService', () => {
	let service: LanguageApiService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(LanguageApiService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
