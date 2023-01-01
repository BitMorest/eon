import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {EonModule,	BootstrapComponent} from '@bitmorest/eon-angular';
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
import { translocoConfig } from '@ngneat/transloco';
import { TranslocoHttpLoader } from './transloco.loader';

const translocoConfigs = translocoConfig({
	availableLangs: ['en', 'es'],
	defaultLang: 'en',
	reRenderOnLangChange: true,
});

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
		EonModule.forRoot(eonConfigs,translocoConfigs, TranslocoHttpLoader),
		RouterModule.forRoot(routes),
	],
	providers: [],
	bootstrap: [BootstrapComponent],
})
export class AppModule {}
