import {Application} from '../components/application';
import {Window} from '../components/window';

export abstract class ApiService<In, Out> {
	abstract booting(_app: Application, _window: Window): void;

	abstract receptionChannel(): string;

	abstract sendingChannel(): string;

	abstract process(_app: Application, _window: Window, _input: In): Out;
}
