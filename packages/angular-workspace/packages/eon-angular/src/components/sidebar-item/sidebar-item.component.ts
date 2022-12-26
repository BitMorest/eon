import {
	Component,
	HostBinding,
	HostListener,
	Input,
	OnInit,
} from '@angular/core';
import {NavigationEnd, Router, Scroll} from '@angular/router';
import {SideBarItemClickEventService} from '../../services/events/side-bar-item-click-event.service';

export interface SideBarItem {
	icon: string;
	href: string;
	bottom?: boolean;
	description?: string;
}

@Component({
	selector: 'sidebar-item',
	template: `<i class="fa-duotone fa-house"></i>`,
	styleUrls: ['sidebar-item.component.scss'],
	host: {
		class: `d-flex flex-column align-items-center justify-content-center`,
	},
})
export class SideBarItemComponent implements OnInit {
	/**
	 * Icon name string from material icon
	 */
	@Input()
	public icon!: string;

	@Input()
	public href!: string;

	@Input()
	public description!: string;

	@HostBinding('style.aspect-ratio')
	@Input()
	public aspectRatio = 1;

	@HostBinding('class.mt-auto')
	@Input()
	public bottom? = false;

	@HostBinding('class.active')
	public active = false;

	/**
	 * Prevent default output click event
	 * @internal
	 */
	private click?: undefined;

	constructor(
		private router: Router,
		private sideBarItemClickEventService: SideBarItemClickEventService
	) {}

	ngOnInit(): void {
		if (this.href && !this.href.includes('://')) {
			this.router.events.subscribe((event) => {
				// Wait for redirect end
				if (event instanceof NavigationEnd) {
					this.active = event.url == this.href;
				} else if (
					event instanceof Scroll &&
					event.routerEvent instanceof NavigationEnd
				) {
					this.active = event.routerEvent.urlAfterRedirects == this.href;
				}
			});
		}
	}

	@HostListener('click')
	onClickHandler() {
		const shouldDefaultProcess = this.sideBarItemClickEventService.emit({
			href: this.href,
			active: this.active,
		});
		if (shouldDefaultProcess) {
			if (this.href && !this.href.includes('://')) {
				this.router.navigateByUrl(this.href);
			} else if (this.href) {
				window.open(this.href);
			}
		}
	}
}
