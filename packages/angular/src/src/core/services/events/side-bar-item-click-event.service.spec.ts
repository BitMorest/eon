import {TestBed} from '@angular/core/testing';

import {SideBarItemClickEventService} from './side-bar-item-click-event.service';

describe('SideBarItemClickEventService', () => {
	let service: SideBarItemClickEventService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(SideBarItemClickEventService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
