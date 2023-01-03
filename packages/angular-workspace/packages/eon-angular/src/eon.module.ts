import { APP_INITIALIZER, Injectable, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ThemeApiService } from './services/theme-api.service';
import { BootstrapComponent } from './components/bootstrap/bootstrap.component';
import { SidebarLayoutComponent } from './components/sidebar-layout/sidebar-layout.component';
import { FramelessLayoutComponent } from './components/frameless-layout/frameless-layout.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { WindowControlsComponent } from './components/window-controls/window-controls.component';
import { WindowButtonComponent } from './components/window-button/window-button.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SideBarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { ThemeSettingComponent } from './components/theme-setting/theme-setting.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { LanguageSettingComponent } from './components/language-setting/language-setting.component';
import { LanguageApiService } from './services/language-api.service';
import { WindowApiService } from './services/window-api.service';
import { EonConfig, EON_CONFIG } from './config';
import { Translation, TranslocoConfig, TranslocoLoader, TranslocoModule, TRANSLOCO_CONFIG, TRANSLOCO_LOADER, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



function initializeAppFactory(window: WindowApiService, theme: ThemeApiService, language: LanguageApiService): () => Promise<void> {
	return () => {
		return new Promise(async (resolve) => {
			Promise.all([
				window.initialize(),
				theme.initialize(),
				language.initialize(),
			]);
			resolve();
		});
	};
}

@NgModule({
	declarations: [
		// export
		BootstrapComponent,
		SidebarLayoutComponent,
		FramelessLayoutComponent,
		ThemeSettingComponent,
		LanguageSettingComponent,

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
		MatSelectModule,
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
		MatSelectModule,

		// Export components
		BootstrapComponent,
		SidebarLayoutComponent,
		FramelessLayoutComponent,
		ThemeSettingComponent,
		LanguageSettingComponent,
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: initializeAppFactory,
			deps: [ThemeApiService, LanguageApiService, WindowApiService],
			multi: true,
		}
	],
})
export class EonModule {

	static forRoot(config: EonConfig): ModuleWithProviders<EonModule> {
		return {
			ngModule: EonModule,
			providers: [
				{ provide: EON_CONFIG, useValue: config },
				{ provide: TRANSLOCO_CONFIG, useValue: {
					... config.translocoConfig,
					...{
						reRenderOnLangChange: true,
					},
				 },
				},
				{ provide: TRANSLOCO_LOADER, useClass: config.translocoLoader }
			],
		};
	}

}
