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
import {SettingsComponent} from './settings.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';

@NgModule({
	declarations: [SettingsComponent],
	imports: [
		RouterModule.forChild([{path: '', component: SettingsComponent}]),
		SharedModule,
		MatButtonModule,
		MatDividerModule,
		MatIconModule,
		MatButtonToggleModule,
		MatInputModule,
		MatCheckboxModule,
		ReactiveFormsModule,
		MatCardModule,
	],
	providers: [{provide: TRANSLOCO_SCOPE, useValue: 'settings'}],
})
export class SettingsModule {}
