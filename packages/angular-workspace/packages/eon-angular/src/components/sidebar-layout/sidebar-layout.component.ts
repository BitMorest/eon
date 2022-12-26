import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SideBarItem} from '../sidebar-item/sidebar-item.component';

export interface SideBarLayoutData {
	sidebarItems: Array<SideBarItem>;
}

@Component({
	selector: 'sidebar-layout',
	template: `
		<titlebar></titlebar>
		<div class="d-flex flex-row vw-100 overflow-hidden flex-grow-1">
			<sidebar>
				<sidebar-item
					*ngFor="let item of items"
					[icon]="item.icon"
					[href]="item.href"
					[description]="item.description ? item.description : ''"
					[bottom]="item.bottom"
				>
				</sidebar-item>
			</sidebar>
			<div class="flex-grow-1 overflow-auto main-content">
				<div class="container-fluid">
					<router-outlet></router-outlet>
				</div>
			</div>
		</div>
	`,
	styleUrls: ['sidebar-layout.component.scss'],
	host: {
		class: 'd-flex flex-column vw-100 vh-100 overflow-hidden',
	},
})
export class SidebarLayoutComponent implements OnInit {
	public items?: Array<SideBarItem>;

	constructor(private activatedroute: ActivatedRoute) {}

	ngOnInit(): void {
		this.activatedroute.data.subscribe((data) => {
			data = data as SideBarLayoutData;
			this.items = data['sidebarItems'];
			console.log(this.items);
		});
	}
}
