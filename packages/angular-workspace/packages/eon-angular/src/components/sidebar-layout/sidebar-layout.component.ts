import {Component} from '@angular/core';

@Component({
	selector: 'sidebar-layout',
	template: `
		<titlebar></titlebar>
		<div class="d-flex flex-row vw-100 overflow-hidden flex-grow-1">
			<sidebar>			
			</sidebar>
			<div class="main-content flex-grow-1 overflow-auto">
				<div class="container-fluid">
					<router-outlet></router-outlet>
				</div>
			</div>
		</div>
	`,
	styleUrls: ['sidebar-layout.component.scss'],
	host: {
		class: 'd-flex flex-column vw-100 vh-100',
	},
})
export class SidebarLayoutComponent{

	
}
