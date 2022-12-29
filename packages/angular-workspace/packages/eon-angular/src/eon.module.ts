import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ThemeApiService} from './services/theme-api.service';
import {BootstrapComponent} from './components/bootstrap/bootstrap.component';
import {SidebarLayoutComponent} from './components/sidebar-layout/sidebar-layout.component';
import {FramelessLayoutComponent} from './components/frameless-layout/frameless-layout.component';
import {TitleBarComponent} from './components/title-bar/title-bar.component';
import {WindowControlsComponent} from './components/window-controls/window-controls.component';
import {WindowButtonComponent} from './components/window-button/window-button.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {SideBarItemComponent} from './components/sidebar-item/sidebar-item.component';
import {ThemeSettingComponent} from './components/theme-setting/theme-setting.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
	declarations: [
		// export
		BootstrapComponent,
		SidebarLayoutComponent,
		FramelessLayoutComponent,
		ThemeSettingComponent,

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
		// Angular Material
		MatButtonModule,
		MatDividerModule,
		MatIconModule,
		MatButtonToggleModule,
		MatTooltipModule,
		MatSelectModule,
		MatInputModule,
		MatCheckboxModule,
	],
	exports: [
		// ReExport angular modules
		CommonModule,
		BrowserModule,
		RouterModule,
		HttpClientModule,

		// Rexport angular material
		MatButtonModule,
		MatDividerModule,
		MatIconModule,
		MatTooltipModule,
		MatSelectModule,
		MatInputModule,
		MatCheckboxModule,

		// Export components
		BootstrapComponent,
		SidebarLayoutComponent,
		FramelessLayoutComponent,
		ThemeSettingComponent,
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			useClass: ThemeApiService,
		},
	],
})
export class EonModule {}
