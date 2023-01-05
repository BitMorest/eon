import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {SettingsComponent} from './settings.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
	declarations: [SettingsComponent],
	imports: [
		RouterModule.forChild([{path: '', component: SettingsComponent}]),
		SharedModule,
		MatSlideToggleModule,
		MatSelectModule,
		MatCardModule,
	],
	providers: [{provide: TRANSLOCO_SCOPE, useValue: 'settings'}],
})
export class SettingsModule {}
