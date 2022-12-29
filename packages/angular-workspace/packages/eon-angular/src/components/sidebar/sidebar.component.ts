import {Component} from '@angular/core';

@Component({
	selector: 'sidebar',
	template: '<ng-content></ng-content>',
	styleUrls: ['sidebar.component.scss'],
	host: {
		class: 'sidebar d-flex flex-column h-100',
	},
})
export class SidebarComponent {}
