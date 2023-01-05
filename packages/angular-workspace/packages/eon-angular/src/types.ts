import {Observer} from 'rxjs';
import {InjectionToken, Type} from '@angular/core';
import {
	LangDefinition,
	TranslocoConfig as TranslocoConfigBase,
} from '@ngneat/transloco';
import {Environment} from '@bitmorest/eon-common';

export interface WindowApi {
	environment: Environment;
	/**
	 * This method is used by the renderer process to receive data from the main process
	 * @param channel used by the renderer to receive data and by the main to send them
	 * @param func the callback function to execute when data are available
	 */
	receive<Out>(channel: string, callback: (output: Out) => void): void;

	/**
	 * This method is used by the renderer process to send data to the main process
	 * @param channel used by the renderer to send data and by the main to receive them
	 * @param data the data sent by the renderer process to the main process
	 */
	send<In>(channel: string, input?: In): void;
}

declare global {
	// Global augmentation of the `Window` interface
	interface Window {
		api: WindowApi;
	}
}

export interface SideBarItem {
	icon: string;
	href: string;
	bottom?: boolean;
	description?: string;
}

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
	translocoLoader: Type<unknown>;
}
