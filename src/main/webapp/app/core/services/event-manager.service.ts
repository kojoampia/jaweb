import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EventManagerService {
  private observable = new Subject<EventWithContent<any>>();

  subscribe(eventName: string, callback: (event: EventWithContent<any>) => void): Subscription {
    return this.observable
      .pipe(filter((event: EventWithContent<any>) => event.name === eventName))
      .subscribe(callback);
  }

  broadcast(event: EventWithContent<any>): void {
    this.observable.next(event);
  }

  destroy(eventName: string): void {
    this.observable.next({ name: eventName, content: null });
  }
}

/** @deprecated Use EventManagerService instead */
export { EventManagerService as EventManager };

export class EventWithContent<T> {
  constructor(
    public name: string,
    public content: T
  ) {}
}
