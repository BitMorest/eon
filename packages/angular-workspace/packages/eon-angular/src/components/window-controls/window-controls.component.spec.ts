import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WControlsComponent} from './window-controls.component';

describe('WindowControlsComponent', () => {
	let component: WControlsComponent;
	let fixture: ComponentFixture<WControlsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [WControlsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(WControlsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
