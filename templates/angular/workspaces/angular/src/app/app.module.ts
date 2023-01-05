import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EonModule, BootstrapComponent} from '@bitmorest/eon-angular';
import {routes} from './routes';
import {sidebarItems} from './sidebar-items';

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
		EonModule.forRoot({
			titlebarTitle: 'EonApp',
			titlebarIcon: 'https://code.visualstudio.com/assets/apple-touch-icon.png',
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
