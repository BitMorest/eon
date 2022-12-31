import {Component, Inject} from '@angular/core';
import { EON_CONFIG, EonConfig } from '../../config';
import { SideBarItem } from '../sidebar-item/sidebar-item.component';

@Component({
	selector: 'sidebar',
	template: `<sidebar-item
					*ngFor="let item of items"
					[icon]="item.icon"
					[href]="item.href"
					[description]="item.description ? item.description : ''"
					[bottom]="item.bottom">
				</sidebar-item>`,
	styleUrls: ['sidebar.component.scss'],
	host: {
		class: 'sidebar d-flex flex-column h-100',
	},
})
export class SidebarComponent {
	public items?: Array<SideBarItem>;

	constructor(@Inject(EON_CONFIG) private config: EonConfig){
		this.items = config.sidebarItems;
	}
	
}
