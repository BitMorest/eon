import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppearanceComponent} from './appearance/appearance.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

@NgModule({
	declarations: [AppearanceComponent],
	imports: [CommonModule, MatSlideToggleModule, MatSelectModule, MatCardModule],
	exports: [
		CommonModule,
		MatSlideToggleModule,
		MatSelectModule,
		MatCardModule,
		AppearanceComponent,
	],
})
export class EonSettingModule {}
