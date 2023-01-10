import {
	APP_INITIALIZER,
	enableProdMode,
	isDevMode,
	ModuleWithProviders,
	NgModule,
} from '@angular/core';
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
import {EonConfig, E_DIZZY_CONFIG} from '../types';
import {
	TranslocoModule,
	TRANSLOCO_CONFIG,
	TRANSLOCO_LOADER,
} from '@ngneat/transloco';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ElectronService} from './services/electron.service';
import {TranslocoHttpLoader} from './services/transloco-http-loader.service';
import {CoreApiConst} from '@e-dizzy/types';

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
		TranslocoModule,
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
			useFactory: (
				_electron: ElectronService,
				_window: BrowserWindowService
			) => {
				return (): Promise<void> => {
					return new Promise((resolve, reject) => {
						if (window && (window as Window).api) {
							if (window.application.enviroment.name == 'production') {
								enableProdMode();
								// disable all console.log in production
								window['console']['log'] = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function
							}
							console.log('Initializing...!!!');
							console.log(
								'Run in ' + window.application.enviroment.name + ' mode!!!'
							);
							console.log('Application global enviroment', window.application);
							const subscription = _window.subscribe((_value) => {
								subscription.unsubscribe();
								console.log('Initialize done!!!');
								resolve();
							});
							_electron.send(CoreApiConst.WINDOW_STATE);
						} else {
							reject(new Error('Preloader API is not loaded!!!'));
						}
					});
				};
			},
			deps: [
				ElectronService,
				BrowserWindowService,
				UIModeService,
				LanguageApiService,
			],
			multi: true,
		},
	],
})
export class EDizzyModule {
	static forRoot(config: EonConfig): ModuleWithProviders<EDizzyModule> {
		return {
			ngModule: EDizzyModule,
			providers: [
				{provide: E_DIZZY_CONFIG, useValue: config},
				{
					provide: TRANSLOCO_CONFIG,
					useValue: {
						...config.translocoConfig,
						reRenderOnLangChange: true,
						failedRetries: 0,
						prodMode: !isDevMode(),
					},
				},
				{provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader},
			],
		};
	}
}
