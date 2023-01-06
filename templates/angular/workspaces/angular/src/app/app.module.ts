import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EonModule, BootstrapComponent} from '@e-dizzy/angular';
import {routes} from './routes';
import {sidebarItems} from './sidebar-items';

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
		EonModule.forRoot({
			titlebarTitle: 'EonApp',
			titlebarIcon: '/assets/icons/icon.png',
			sidebarItems: sidebarItems,
			translocoConfig: {
				availableLangs: [
					{id: 'en', label: 'English'},
					{id: 'vi', label: 'Tiếng Việt'},
				],
				defaultLang: 'en',
			},
		}),
	],
	providers: [],
	bootstrap: [BootstrapComponent],
})
export class AppModule {}
