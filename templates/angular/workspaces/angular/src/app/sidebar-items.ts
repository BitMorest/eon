import {SideBarItem} from '@e-dizzy/angular';

export const sidebarItems: Array<SideBarItem> = [
	{
		icon: 'fa-duotone fa-house',
		href: '/home',
		description: 'Home',
	},
	{
		icon: 'fa-duotone fa-sliders',
		href: '/settings',
		description: 'Settings',
	},
	{
		icon: 'fa-duotone fa-circle-info',
		href: '/about',
		description: 'About',
	},
	{
		icon: 'fa-duotone fa-books',
		href: '/examples',
		description: 'Examples',
	},
	{
		icon: 'fa-duotone fa-circle-question',
		href: '#',
		description: 'Support',
		bottom: true,
	},
];
