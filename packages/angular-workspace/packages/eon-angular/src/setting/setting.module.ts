import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppearanceComponent} from './appearance/appearance.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {TranslocoModule, TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
	declarations: [AppearanceComponent],
	imports: [
		CommonModule,
		MatSlideToggleModule,
		MatSelectModule,
		MatCardModule,
		BrowserModule,
	],
	exports: [
		CommonModule,
		MatSlideToggleModule,
		MatSelectModule,
		MatCardModule,
		TranslocoModule,
		AppearanceComponent,
	],
	providers: [{provide: TRANSLOCO_SCOPE, useValue: 'settings'}],
})
export class EonSettingModule {}
