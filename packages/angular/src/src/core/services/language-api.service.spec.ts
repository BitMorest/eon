import {TestBed} from '@angular/core/testing';
import {TranslocoService} from '@ngneat/transloco';
import {BehaviorSubject} from 'rxjs';

import {LanguageApiService} from './language-api.service';

describe('LanguageApiService', () => {
	let service: LanguageApiService;

	const CONFIG = {
		defaultLang: 'en',
	};

	beforeEach(() => {
		// TestBed.configureTestingModule({ imports: [EDizzyMutilLanguagesModule.forRoot(CONFIG)] });
		// service = TestBed.inject(LanguageApiService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('initialize()', () => {
		const _TranslocoService = TestBed.inject(TranslocoService);
		const _TranslocoServiceGetSpy = spyOn(
			_TranslocoService,
			'setActiveLang'
		).and.callThrough();
		service.initialize('test');
		expect(_TranslocoServiceGetSpy).toHaveBeenCalled();

		const _currentLanguage = service[
			'_currentLanguage'
		] as BehaviorSubject<string>;
		expect(_currentLanguage.getValue()).toBe('test');
	});

	it('initialize() with undefined', () => {
		const _TranslocoService = TestBed.inject(TranslocoService);
		const _TranslocoServiceGetSpy = spyOn(
			_TranslocoService,
			'setActiveLang'
		).and.callThrough();
		service.initialize(undefined);
		expect(_TranslocoServiceGetSpy).toHaveBeenCalledTimes(0);

		const _currentLanguage = service[
			'_currentLanguage'
		] as BehaviorSubject<string>;
		expect(_currentLanguage.getValue()).toBe(CONFIG.defaultLang);
	});
});
