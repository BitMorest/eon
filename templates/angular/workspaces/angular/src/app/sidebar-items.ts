import {SideBarItem} from '@e-dizzy/angular';

export const sidebarItems: Array<SideBarItem> = [
	{
		icon: 'fa-regular fa-house',
		href: '/home',
		description: 'Home',
	},
	{
		icon: 'fa-regular fa-sliders',
		href: '/settings',
		description: 'Settings',
	},
	{
		icon: 'fa-regular fa-circle-info',
		href: '/about',
		description: 'About',
	},
	{
		icon: 'fa-regular fa-books',
		href: '/examples',
		description: 'Examples',
	},
	{
		icon: 'fa-regular fa-circle-question',
		href: '#',
		description: 'Support',
		bottom: true,
	},
];
