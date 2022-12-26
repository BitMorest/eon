import {Injectable} from '@angular/core';
import {PreventableEventService} from '../../class/preventable-event-service';

export type SideBarItemClickEventData = {active: boolean; href: string};

@Injectable({providedIn: 'root'})
export class SideBarItemClickEventService extends PreventableEventService<SideBarItemClickEventData> {}
