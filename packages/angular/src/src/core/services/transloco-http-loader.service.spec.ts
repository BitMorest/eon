import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {TranslocoHttpLoader} from './transloco-http-loader.service';

describe('TranslocoLoaderService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [],
		});
	});

	it('should be created', () => {
		const service = TestBed.inject(TranslocoHttpLoader);
		expect(service).toBeTruthy();
	});

	it('getTranslation() should call HttpClient.get', () => {
		const _HttpClient = TestBed.inject(HttpClient);
		const _HttpClientGetSpy = spyOn(_HttpClient, 'get').and.callThrough();
		const service = TestBed.inject(TranslocoHttpLoader);
		service.getTranslation('test');
		expect(_HttpClientGetSpy).toHaveBeenCalledWith(`/assets/i18n/test.json`);
	});

	it('getTranslation() should call HttpClient.get with scope', () => {
		const _HttpClient = TestBed.inject(HttpClient);
		const _HttpClientGetSpy = spyOn(_HttpClient, 'get').and.callThrough();
		const service = TestBed.inject(TranslocoHttpLoader);
		service.getTranslation('test', {scope: 'scope'});
		expect(_HttpClientGetSpy).toHaveBeenCalledWith(
			`/assets/i18n/scope/test.json`
		);
	});
});
