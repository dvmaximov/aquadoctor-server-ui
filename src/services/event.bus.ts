import { Observable, Subject, Subscription } from 'rxjs';

export enum EventType {
  EVENT_SIGNOUT,
  EVENT_CLEAR_USER,
}

export interface EventData {
  type: EventType;
  data: unknown;
}

class EventBusSubject {
  private bus = new Subject<any>();

  getData(): Observable<any> {
    return this.bus.asObservable();
  }

  sendData(data: EventData): void {
    this.bus.next(data);
  }
}

const eventBus = new EventBusSubject();
export default eventBus;
