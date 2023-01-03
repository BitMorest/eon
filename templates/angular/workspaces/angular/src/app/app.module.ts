import { Injectable, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EonModule, BootstrapComponent } from '@bitmorest/eon-angular';
import { routes } from './routes';
import { sidebarItems } from './sidebar-items';
import { Translation, TranslocoLoader } from '@ngneat/transloco';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
	constructor(private http: HttpClient) { }

	getTranslation(lang: string) {
		return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
	}
}


@NgModule({
	imports: [
		RouterModule.forRoot(routes),
		EonModule.forRoot({
			titlebarTitle: "EonApp",
			titlebarIcon: "https://code.visualstudio.com/assets/apple-touch-icon.png",
			sidebarItems: sidebarItems,
			translocoConfig: {
				availableLangs: [
					{ id: "en", label: "English" },
					{ id: "vi", label: "Tiếng Việt" },
				],
				defaultLang: 'en',
			},
			translocoLoader: TranslocoHttpLoader
		}),


	],
	providers: [],
	bootstrap: [BootstrapComponent],
})
export class AppModule { }
