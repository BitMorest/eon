import {Component} from '@angular/core';

interface Food {
	value: string;
	viewValue: string;
}

@Component({
	selector: 'app-examples',
	templateUrl: './examples.component.html',
	styleUrls: ['./examples.component.scss'],
})
export class ExamplesComponent {
	foods: Food[] = [
		{value: 'steak-0', viewValue: 'Steak'},
		{value: 'pizza-1', viewValue: 'Pizza'},
		{value: 'tacos-2', viewValue: 'Tacos'},
	];
}
