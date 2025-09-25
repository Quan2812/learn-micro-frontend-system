import { Injectable } from "@angular/core"
import { Subject, type Observable, filter, map } from "rxjs"

export interface EventData {
  type: string
  payload?: any
  source?: string
  timestamp?: number
}

@Injectable({
  providedIn: "root",
})
export class EventBusService {
  private eventSubject = new Subject<EventData>()

  constructor() {}

  // Emit an event
  emit(type: string, payload?: any, source?: string): void {
    const eventData: EventData = {
      type,
      payload,
      source,
      timestamp: Date.now(),
    }
    this.eventSubject.next(eventData)
  }

  // Listen to specific event types
  on(eventType: string): Observable<EventData> {
    return this.eventSubject.asObservable().pipe(filter((event) => event.type === eventType))
  }

  // Listen to events from specific source
  onFromSource(source: string): Observable<EventData> {
    return this.eventSubject.asObservable().pipe(filter((event) => event.source === source))
  }

  // Listen to specific event type from specific source
  onFromSourceAndType(source: string, eventType: string): Observable<EventData> {
    return this.eventSubject.asObservable().pipe(filter((event) => event.source === source && event.type === eventType))
  }

  // Get payload only for specific event type
  getPayload<T>(eventType: string): Observable<T> {
    return this.on(eventType).pipe(map((event) => event.payload as T))
  }
}

// Common event types
export const EVENT_TYPES = {
  // Navigation events
  NAVIGATE: "navigate",
  ROUTE_CHANGED: "route_changed",

  // User events
  USER_LOGIN: "user_login",
  USER_LOGOUT: "user_logout",
  USER_UPDATED: "user_updated",

  // Campaign events
  CAMPAIGN_CREATED: "campaign_created",
  CAMPAIGN_UPDATED: "campaign_updated",
  CAMPAIGN_DELETED: "campaign_deleted",

  // Template events
  TEMPLATE_SELECTED: "template_selected",
  TEMPLATE_CREATED: "template_created",
  TEMPLATE_UPDATED: "template_updated",

  // Notification events
  SHOW_NOTIFICATION: "show_notification",
  HIDE_NOTIFICATION: "hide_notification",

  // Data refresh events
  REFRESH_DATA: "refresh_data",
  DATA_UPDATED: "data_updated",
} as const
