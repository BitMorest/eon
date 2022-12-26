import {Component} from '@angular/core';

@Component({
	selector: 'framless-layout',
	template: `
		<titlebar></titlebar>
		<div class="flex-grow-1 overflow-auto">
			<div class="container-fluid">
				<router-outlet></router-outlet>
			</div>
		</div>
	`,
	host: {
		class: 'd-flex flex-column vw-100 vh-100 overflow-hiden',
	},
})
export class FramelessLayoutComponent {}
