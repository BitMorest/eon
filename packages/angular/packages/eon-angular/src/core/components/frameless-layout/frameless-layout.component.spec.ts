import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FramelessLayoutComponent} from './frameless-layout.component';

describe('FramlessLayoutComponent', () => {
	let component: FramelessLayoutComponent;
	let fixture: ComponentFixture<FramelessLayoutComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FramelessLayoutComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FramelessLayoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
