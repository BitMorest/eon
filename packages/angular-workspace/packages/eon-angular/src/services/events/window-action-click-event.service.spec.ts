import {TestBed} from '@angular/core/testing';

import {WindowActionClickEventService} from './window-action-click-event.service';

describe('WindowActionButtonClickEventService', () => {
	let service: WindowActionClickEventService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(WindowActionClickEventService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
