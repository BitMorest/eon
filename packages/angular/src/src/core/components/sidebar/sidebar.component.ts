import {AfterViewInit, Component, Inject} from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';
import {E_DIZZY_CONFIG, EonConfig, SideBarItem} from '../../../types';

@Component({
	selector: 'sidebar',
	template: `
		<ng-container *transloco="let t">
			<sidebar-item
				*ngFor="let item of items"
				[icon]="item.icon"
				[href]="item.href"
				[description]="item.description ? t(item.description) : ''"
				[bottom]="item.bottom"
			>
			</sidebar-item>
		</ng-container>
	`,
	styleUrls: ['sidebar.component.scss'],
	host: {
		class: 'sidebar d-flex flex-column h-100',
	},
})
export class SidebarComponent {
	public items?: Array<SideBarItem>;

	constructor(@Inject(E_DIZZY_CONFIG) private _config: EonConfig) {
		this.items = this._config.sidebarItems;
	}
}
