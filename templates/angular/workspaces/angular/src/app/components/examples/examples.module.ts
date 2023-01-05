import {NgModule} from '@angular/core';
import {ExamplesComponent} from './examples.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {SharedModule} from 'src/app/shared/shared.module';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
	declarations: [ExamplesComponent],
	imports: [
		SharedModule,
		RouterModule.forChild([{path: '', component: ExamplesComponent}]),
		MatButtonModule,
		MatDividerModule,
		MatIconModule,
		MatButtonToggleModule,
		MatInputModule,
		MatCheckboxModule,
		ReactiveFormsModule,
		MatCardModule,
		MatOptionModule,
		MatSelectModule,
	],
})
export class ExamplesModule {}
