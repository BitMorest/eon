import {TestBed} from '@angular/core/testing';
import {ElectronService} from './electron.service';
import {WindowApiService} from './window-api.service';

describe('WindowApiService', () => {
	let service: WindowApiService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [WindowApiService, ElectronService],
		});
		service = TestBed.inject(WindowApiService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
