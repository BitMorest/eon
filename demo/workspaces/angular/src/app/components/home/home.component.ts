import {Component, OnInit} from '@angular/core';
import {FormControl, UntypedFormGroup} from '@angular/forms';
// import {TranslateService} from '@ngx-translate/core';
import {ElectronService} from '@e-dizzy/angular';
import {AppApiConst} from 'shared';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	timesTableForm = new UntypedFormGroup({
		input: new FormControl<number>(Math.round(Math.random() * 100) % 10, {
			nonNullable: true,
		}),
	});

	multiples: number[] = [];

	constructor(
		private electron: ElectronService // private translate: TranslateService
	) {}

	ngOnInit(): void {
		// Specifying what to do with received data from main process
		this.electron.receive<number[]>(
			AppApiConst.MULTIPLES_OUTPUT,
			(output: number[]) => {
				// Update current data
				this.multiples = output;
			}
		);

		// Reset multiples on form changes
		this.timesTableForm.valueChanges.subscribe(() => {
			this.multiples = [];
		});

		// Init time tables with given random value
		this.onSubmit();
	}

	onSubmit(): void {
		const input = this.timesTableForm.value.input;
		this.electron.send(AppApiConst.MULTIPLES_INPUT, input);
	}
}
