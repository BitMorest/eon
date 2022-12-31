import {HttpClient} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HomeComponent} from './components/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
	EonModule,
	BootstrapComponent,
	SidebarLayoutComponent,
	SideBarLayoutData,
	// FramelessLayoutComponent,
} from '@bitmorest/eon-angular';
import {AboutComponent} from './components/about/about.component';
import {SettingsComponent} from './components/settings/settings.component';
import {ExamplesComponent} from './components/examples/examples.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		HomeComponent,
		AboutComponent,
		SettingsComponent,
		ExamplesComponent,
	],
	imports: [
		MatButtonModule,
		MatDividerModule,
		MatIconModule,
		MatButtonToggleModule,
		MatInputModule,
		MatCheckboxModule,

		ReactiveFormsModule,
		MatCardModule,
		BrowserAnimationsModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
		}),
		// EonModule,
		EonModule.forRoot({
			titlebarTitle: "EonApp",
			sidebarItems: []
		}),
		RouterModule.forRoot([
			{
				path: '',
				component: SidebarLayoutComponent,
				data: {
					sidebarItems: [
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
							description: 'Support',
							bottom: true,
						},
					],
				} as SideBarLayoutData,
				children: [
					{path: '', pathMatch: 'full', redirectTo: '/home'},
					{path: 'home', component: HomeComponent},
					{path: 'settings', component: SettingsComponent},
					{path: 'examples', component: ExamplesComponent},
					{path: 'about', component: AboutComponent},
				],
			},
			// Using bellow for layout out without sidebar
			// {
			// 	path: '',
			// 	component: FramelessLayoutComponent,
			// 	children: [{path: 'active', component: SettingsComponent}],
			// },
		]),
	],
	providers: [],
	bootstrap: [BootstrapComponent],
})
export class AppModule {}
