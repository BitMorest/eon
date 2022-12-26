import {Injectable} from '@angular/core';
import {PreventableEventService} from '../../class/preventable-event-service';

@Injectable({
	providedIn: 'root',
})
/* eslint-disable  @typescript-eslint/no-explicit-any */
export class WindowActionClickEventService extends PreventableEventService<any> {}
