import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SideBarItemComponent} from './sidebar-item.component';

describe('SideBarItemComponent', () => {
	let component: SideBarItemComponent;
	let fixture: ComponentFixture<SideBarItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SideBarItemComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SideBarItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
