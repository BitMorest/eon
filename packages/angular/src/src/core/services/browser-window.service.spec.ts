import {TestBed} from '@angular/core/testing';
import {ElectronService} from './electron.service';
import {BrowserWindowService} from './browser-window.service';

describe('WindowApiService', () => {
	let service: BrowserWindowService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [BrowserWindowService, ElectronService],
		});
		service = TestBed.inject(BrowserWindowService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
