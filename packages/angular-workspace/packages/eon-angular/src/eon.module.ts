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
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ThemeSettingComponent} from './components/theme-setting/theme-setting.component';

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
		CommonModule,
		BrowserModule,
		RouterModule,
		HttpClientModule,
		TooltipModule.forRoot(),
	],
	exports: [
		// ReExport modules
		CommonModule,
		BrowserModule,
		RouterModule,
		HttpClientModule,
		TooltipModule,

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
