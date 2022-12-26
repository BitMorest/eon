import {TestBed} from '@angular/core/testing';
import {ElectronService} from './electron.service';

fdescribe('ElectronIpcService', () => {
	let service: ElectronService;

	beforeEach(() => {
		TestBed.configureTestingModule({providers: [ElectronService]});
		service = TestBed.inject(ElectronService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
