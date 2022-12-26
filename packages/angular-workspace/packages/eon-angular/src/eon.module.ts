import {APP_INITIALIZER, NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ThemeApiService} from './services/theme-api.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BootstrapComponent} from './components/bootstrap/bootstrap.component';
import {SidebarLayoutComponent} from './components/sidebar-layout/sidebar-layout.component';
import {FramelessLayoutComponent} from './components/frameless-layout/frameless-layout.component';
import {TitleBarComponent} from './components/title-bar/title-bar.component';
import {WindowControlsComponent} from './components/window-controls/window-controls.component';
import {WindowButtonComponent} from './components/window-button/window-button.component';
import {CommonSettingsComponent} from './components/common-settings/common-settings.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {SideBarItemComponent} from './components/sidebar-item/sidebar-item.component';

@NgModule({
	declarations: [
		// export
		BootstrapComponent,
		SidebarLayoutComponent,
		FramelessLayoutComponent,
		CommonSettingsComponent,

		// internal
		TitleBarComponent,
		WindowControlsComponent,
		WindowButtonComponent,
		SidebarComponent,
		SideBarItemComponent,
	],
	imports: [
		CommonModule,
		BrowserModule,
		RouterModule,
		MatIconModule,
		MatTooltipModule,
	],
	exports: [
		// Rexport modules
		CommonModule,
		BrowserModule,
		RouterModule,
		MatIconModule,
		MatTooltipModule,

		// Export components
		BootstrapComponent,
		SidebarLayoutComponent,
		FramelessLayoutComponent,
		CommonSettingsComponent,
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			useClass: ThemeApiService,
		},
	],
})
export class EonModule {}
