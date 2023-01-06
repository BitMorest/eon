/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unicorn/consistent-function-scoping */
import {NgZone} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {WindowApi} from '../../types';
import {ElectronService} from './electron.service';

describe('ElectronService', () => {
	let service: ElectronService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ElectronService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should have 2 method send & received', () => {
		expect(typeof service.send == 'function').toBeTruthy();
		expect(typeof service.receive == 'function').toBeTruthy();
	});

	it('send() & receive() - not throw error when electron is not avaiable', () => {
		const CHANNEL = 'channel';
		expect(() => {
			service.send(CHANNEL);
		}).not.toThrow();
		expect(() => {
			service.receive(CHANNEL, () => {});
		}).not.toThrow();
	});

	it('send() - will call window.api.send', () => {
		// mocking & spy window API
		const windowApi = {
			environment: {},
			send: (_channel: string, _input?: unknown) => {},
			receive: (_channel: string, callback: (output: unknown) => void) => {},
		} as WindowApi;
		service['_api'] = windowApi;

		const WindowApiSendSpy = spyOn<any>(windowApi, 'send');

		const CHANNEL = 'channel';
		service.send(CHANNEL);
		expect(WindowApiSendSpy).toHaveBeenCalledOnceWith(CHANNEL);

		const DATA = 'data';
		service.send(CHANNEL, DATA);
		expect(WindowApiSendSpy).toHaveBeenCalledWith(CHANNEL, DATA);
	});

	it('receive() - will call window.api.received', () => {
		// mocking & spy window API
		const windowApi = {
			environment: {},
			send: (_channel: string, _input?: unknown) => {},
			receive: (_channel: string, callback: (output: unknown) => void) => {},
		} as WindowApi;
		service['_api'] = windowApi;

		const WindowApiReceivedSpy = spyOn<any>(windowApi, 'receive');

		const CHANNEL = 'channel';
		const callbackFunction = () => {};
		service.receive(CHANNEL, callbackFunction);
		expect(WindowApiReceivedSpy).toHaveBeenCalled();
	});

	it('receive() - will call callback inside ngZone', (done) => {
		const _NgZone = TestBed.inject(NgZone);
		const NgZoneRunSpy = spyOn(_NgZone, 'run').and.callThrough();

		// mocking & spy window API
		const windowApi = {
			environment: {},
			send: (_channel: string, _input?: unknown) => {},
			receive: (channel: string, callback: (output: unknown) => void) => {
				callback(channel);
			},
		} as WindowApi;
		service['_api'] = windowApi;

		const CHANNEL = 'channel';
		const callback = (output: unknown) => {
			expect(NgZoneRunSpy).toHaveBeenCalled();
			expect(output).toBe(CHANNEL);
			done();
		};
		service.receive(CHANNEL, callback);
	});
});
