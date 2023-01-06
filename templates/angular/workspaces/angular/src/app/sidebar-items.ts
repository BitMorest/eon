import {marker as _} from '@ngneat/transloco-keys-manager/marker';
import {SideBarItem} from '@e-dizzy/angular';

export const sidebarItems: Array<SideBarItem> = [
	{
		icon: 'fa-duotone fa-house',
		href: '/home',
		description: _('sidebar.Home'),
	},
	{
		icon: 'fa-duotone fa-sliders',
		href: '/settings',
		description: _('sidebar.Settings'),
	},
	{
		icon: 'fa-duotone fa-circle-info',
		href: '/about',
		description: _('sidebar.About'),
	},
	{
		icon: 'fa-duotone fa-books',
		href: '/examples',
		description: _('sidebar.Examples'),
	},
	{
		icon: 'fa-duotone fa-circle-question',
		href: '#',
		description: _('sidebar.Support'),
		bottom: true,
	},
];
