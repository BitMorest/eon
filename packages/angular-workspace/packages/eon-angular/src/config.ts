import { InjectionToken, Type } from "@angular/core";
import { LangDefinition, TranslocoConfig as TranslocoConfigBase} from "@ngneat/transloco";
import { SideBarItem } from "./components/sidebar-item/sidebar-item.component";

export interface TranslocoConfig extends Omit<TranslocoConfigBase,'reRenderOnLangChange'| 'prodMode'>{
	availableLangs?: LangDefinition[];
}

export interface EonConfig{
	titlebarTitle?: string;
	titlebarIcon?: string;
    sidebarItems?: Array<SideBarItem>;
	translocoConfig: TranslocoConfig;
	translocoLoader: Type<any>;
}

export const EON_CONFIG = new InjectionToken<EonConfig>("EON_CONFIG");
