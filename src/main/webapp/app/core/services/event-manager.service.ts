import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventManagerService {
  private observable = new Subject<EventWithContent<any>>();

  subscribe(eventName: string, callback: (event: EventWithContent<any>) => void): void {
    this.observable.subscribe((event: EventWithContent<any>) => {
      if (event.name === eventName) {
        callback(event);
      }
    });
  }

  broadcast(event: EventWithContent<any>): void {
    this.observable.next(event);
  }

  destroy(eventName: string): void {
    this.observable.next({ name: eventName, content: null });
  }
}

export class EventWithContent<T> {
  constructor(
    public name: string,
    public content: T
  ) {}
}
