import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Translation, TranslocoLoader} from '@ngneat/transloco';
import {TranslocoLoaderData} from '@ngneat/transloco/lib/transloco.loader';
import {Observable} from 'rxjs';
import {EonConfig, E_DIZZY_CONFIG} from '../../types';

@Injectable({
	providedIn: 'root',
})
export class TranslocoHttpLoader implements TranslocoLoader {
	constructor(
		private http: HttpClient,
		@Inject(E_DIZZY_CONFIG) private config: EonConfig
	) {}

	getTranslation(
		_lang: string,
		_data?: TranslocoLoaderData | undefined
	): Observable<Translation> | Promise<Translation> {
		let rootUrl = '/assets/i18n/';
		if (this.config.translocoConfig.translationRootUrl) {
			rootUrl = this.config.translocoConfig.translationRootUrl;
		}
		if (!rootUrl.endsWith('/')) {
			rootUrl += '/';
		}

		if (_data) {
			rootUrl += `${_data.scope}/`;
		}
		return this.http.get<Translation>(`${rootUrl}${_lang}.json`);
	}
}
