import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SettingsComponent} from './settings.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {EonSettingModule} from '@e-dizzy/angular';

@NgModule({
	declarations: [SettingsComponent],
	imports: [
		EonSettingModule,
		SharedModule,
		RouterModule.forChild([{path: '', component: SettingsComponent}]),
	],
})
export class SettingsModule {}
