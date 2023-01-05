import {CoreApiConst, WindowApiInput, WindowApiInputAction} from '../../src';

/* eslint-disable @typescript-eslint/no-unused-vars */
describe('test add function', () => {
	it('WindowApiInputAction', () => {
		let _: WindowApiInputAction = 'minimize';
		_ = 'toogleMaximize';
		_ = 'close';
	});

	it('WindowApiInput', () => {
		let _: WindowApiInput = {};
		_ = {action: 'close'};
	});

	it('CoreApiConst', () => {
		expect(CoreApiConst.WINDOW_API_INPUT).toEqual('WindowApiInput');
		expect(CoreApiConst.WINDOW_API_OUTPUT).toEqual('WindowApiOuput');
		expect(CoreApiConst.ENVIROMENT_API_INPUT).toEqual('EnviromentApiInput');
		expect(CoreApiConst.ENVIROMENT_API_OUTPUT).toEqual('EnviromentApiOuput');
	});
});
