import {HttpClient} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HomeComponent} from './components/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {	EonModule,	BootstrapComponent} from '@bitmorest/eon-angular';
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
import { routes } from './routes';
import { eonConfigs } from './eon.config';

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
		EonModule.forRoot(eonConfigs),
		RouterModule.forRoot(routes),
	],
	providers: [],
	bootstrap: [BootstrapComponent],
})
export class AppModule {}
