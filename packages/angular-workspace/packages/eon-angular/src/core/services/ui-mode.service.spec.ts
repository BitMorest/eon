import {TestBed} from '@angular/core/testing';

import {UIModeService} from './ui-mode.service';

describe('ThemeApiService', () => {
	let service: UIModeService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(UIModeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
