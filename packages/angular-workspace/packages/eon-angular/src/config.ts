import { InjectionToken } from "@angular/core";
import { TranslocoConfig } from "@ngneat/transloco";
import { SideBarItem } from "./components/sidebar-item/sidebar-item.component";

export interface EonConfig{
	titlebarTitle?: string | undefined;
	titlebarIcon?: string | undefined;
    sidebarItems?: Array<SideBarItem> | undefined;
}
export const EON_CONFIG = new InjectionToken("EON_CONFIG");
