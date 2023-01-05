import {Observer} from 'rxjs';
import {InjectionToken, Type} from '@angular/core';
import {
	LangDefinition,
	TranslocoConfig as TranslocoConfigBase,
	TranslocoLoader,
} from '@ngneat/transloco';
import {SideBarItem} from './components/sidebar-item/sidebar-item.component';

export type ObserverOrNext<T> = Partial<Observer<T>> | ((value: T) => void);

export interface TranslocoConfig
	extends Omit<TranslocoConfigBase, 'reRenderOnLangChange' | 'prodMode'> {
	availableLangs?: LangDefinition[];
}

export const EON_CONFIG = new InjectionToken<EonConfig>('EON_CONFIG');

export interface EonConfig {
	titlebarTitle?: string;
	titlebarIcon?: string;
	sidebarItems?: Array<SideBarItem>;
	translocoConfig: TranslocoConfig;
	translocoLoader: Type<TranslocoLoader>;
}
