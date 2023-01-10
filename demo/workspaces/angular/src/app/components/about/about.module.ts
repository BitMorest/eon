import {NgModule} from '@angular/core';
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
import {AboutComponent} from './about.component';
@NgModule({
	declarations: [AboutComponent],
	imports: [
		SharedModule,
		RouterModule.forChild([{path: '', component: AboutComponent}]),
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
export class AboutModule {}
