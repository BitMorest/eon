import {AppApiConst} from 'shared';
import {ApiService, Application, Window} from '@e-dizzy/electron';

export class MultiplesApiService extends ApiService<number, number[]> {
	receptionChannel(): string {
		return AppApiConst.MULTIPLES_INPUT;
	}

	sendingChannel(): string {
		return AppApiConst.MULTIPLES_OUTPUT;
	}

	process(_app: Application, _window: Window, _input: number): number[] {
		// From 1 to 10, return input multiples
		const multiples = [];
		for (let n = 1; n <= 10; n++) {
			multiples.push(n * _input);
		}
		return multiples;
	}
}
