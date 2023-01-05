import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {UIModeService} from './services/ui-mode.service';
import {BootstrapComponent} from './components/bootstrap/bootstrap.component';
import {SidebarLayoutComponent} from './components/sidebar-layout/sidebar-layout.component';
import {FramelessLayoutComponent} from './components/frameless-layout/frameless-layout.component';
import {TitleBarComponent} from './components/title-bar/title-bar.component';
import {WindowControlsComponent} from './components/window-controls/window-controls.component';
import {WindowButtonComponent} from './components/window-button/window-button.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {SideBarItemComponent} from './components/sidebar-item/sidebar-item.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {LanguageApiService} from './services/language-api.service';
import {BrowserWindowService} from './services/browser-window.service';
import {EonConfig, EON_CONFIG} from './types';
import {
	TranslocoModule,
	TRANSLOCO_CONFIG,
	TRANSLOCO_LOADER,
} from '@ngneat/transloco';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InitializeService} from './services/initialize.service';
import {ElectronService} from './public-api';

@NgModule({
	declarations: [
		// export
		BootstrapComponent,
		SidebarLayoutComponent,
		FramelessLayoutComponent,

		// internal
		TitleBarComponent,
		WindowControlsComponent,
		WindowButtonComponent,
		SidebarComponent,
		SideBarItemComponent,
	],
	imports: [
		// Core
		CommonModule,
		BrowserModule,
		RouterModule,
		HttpClientModule,
		BrowserAnimationsModule,
		// Angular Material
		MatTooltipModule,
	],
	exports: [
		// ReExport angular modules
		CommonModule,
		BrowserModule,
		RouterModule,
		HttpClientModule,
		TranslocoModule,
		BrowserAnimationsModule,

		// Rexport angular material
		MatTooltipModule,

		// Export components
		BootstrapComponent,
		SidebarLayoutComponent,
		FramelessLayoutComponent,
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			// eslint-disable-next-line unicorn/consistent-function-scoping
			useFactory: () => () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
			deps: [
				InitializeService,
				ElectronService,
				UIModeService,
				LanguageApiService,
				BrowserWindowService,
			],
			multi: true,
		},
	],
})
export class EonModule {
	static forRoot(config: EonConfig): ModuleWithProviders<EonModule> {
		return {
			ngModule: EonModule,
			providers: [
				{provide: EON_CONFIG, useValue: config},
				{
					provide: TRANSLOCO_CONFIG,
					useValue: {
						...config.translocoConfig,
						reRenderOnLangChange: true,
					},
				},
				{provide: TRANSLOCO_LOADER, useClass: config.translocoLoader},
			],
		};
	}
}
