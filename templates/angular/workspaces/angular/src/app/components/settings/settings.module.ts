import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SettingsComponent} from './settings.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {EonSettingModule} from '@bitmorest/eon-angular';

@NgModule({
	declarations: [SettingsComponent],
	imports: [
		EonSettingModule,
		SharedModule,
		RouterModule.forChild([{path: '', component: SettingsComponent}]),
	],
	providers: [{provide: TRANSLOCO_SCOPE, useValue: 'settings'}],
})
export class SettingsModule {}
