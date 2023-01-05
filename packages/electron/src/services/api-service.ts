import {Application, Window} from '../components';

export abstract class ApiService<In, Out> {
	abstract receptionChannel(): string;

	abstract sendingChannel(): string;

	abstract process(_app: Application, _window: Window, _input: In): Out;
}
