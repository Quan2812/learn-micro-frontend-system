import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable, Subject } from "rxjs"
import { filter, map } from "rxjs/operators"

export interface MicroFrontendMessage {
  type: string
  payload: any
  source: string
  target?: string
  timestamp: Date
}

@Injectable({
  providedIn: "root",
})
export class CommunicationService {
  private messageSubject = new Subject<MicroFrontendMessage>()
  private globalStateSubject = new BehaviorSubject<Record<string, any>>({})

  public messages$ = this.messageSubject.asObservable()
  public globalState$ = this.globalStateSubject.asObservable()

  constructor() {
    // Listen for window messages (for cross-origin communication)
    window.addEventListener("message", (event) => {
      if (event.data && event.data.type && event.data.source) {
        this.handleMessage(event.data)
      }
    })
  }

  // Send message to specific micro frontend or broadcast to all
  sendMessage(type: string, payload: any, source: string, target?: string): void {
    const message: MicroFrontendMessage = {
      type,
      payload,
      source,
      target,
      timestamp: new Date(),
    }

    // Emit to internal subscribers
    this.messageSubject.next(message)

    // Send via window.postMessage for cross-origin communication
    if (target) {
      // Send to specific target (if you know the target window)
      window.postMessage(message, "*")
    } else {
      // Broadcast to all
      window.postMessage(message, "*")
    }
  }

  // Listen for specific message types
  onMessage(type: string): Observable<MicroFrontendMessage> {
    return this.messages$.pipe(filter((message) => message.type === type))
  }

  // Listen for messages from specific source
  onMessageFromSource(source: string): Observable<MicroFrontendMessage> {
    return this.messages$.pipe(filter((message) => message.source === source))
  }

  // Listen for messages targeted to specific recipient
  onMessageForTarget(target: string): Observable<MicroFrontendMessage> {
    return this.messages$.pipe(filter((message) => !message.target || message.target === target))
  }

  // Global state management
  updateGlobalState(key: string, value: any): void {
    const currentState = this.globalStateSubject.value
    const newState = { ...currentState, [key]: value }
    this.globalStateSubject.next(newState)

    // Broadcast state change
    this.sendMessage("GLOBAL_STATE_CHANGED", { key, value }, "shared-service")
  }

  getGlobalState(): Record<string, any> {
    return this.globalStateSubject.value
  }

  getGlobalStateValue(key: string): any {
    return this.globalStateSubject.value[key]
  }

  // Watch for changes to specific global state key
  watchGlobalState(key: string): Observable<any> {
    return this.globalState$.pipe(
      map((state) => state[key]),
      filter((value) => value !== undefined),
    )
  }

  // Common message types
  notifyUserAction(action: string, data: any, source: string): void {
    this.sendMessage("USER_ACTION", { action, data }, source)
  }

  notifyNavigation(route: string, source: string): void {
    this.sendMessage("NAVIGATION", { route }, source)
  }

  notifyDataChange(entity: string, operation: string, data: any, source: string): void {
    this.sendMessage("DATA_CHANGE", { entity, operation, data }, source)
  }

  notifyError(error: any, source: string): void {
    this.sendMessage("ERROR", { error }, source)
  }

  private handleMessage(message: MicroFrontendMessage): void {
    // Handle specific message types
    switch (message.type) {
      case "GLOBAL_STATE_CHANGED":
        // Update local global state if message is from another MFE
        if (message.source !== "shared-service") {
          const { key, value } = message.payload
          const currentState = this.globalStateSubject.value
          const newState = { ...currentState, [key]: value }
          this.globalStateSubject.next(newState)
        }
        break

      default:
        // Just emit the message for subscribers
        this.messageSubject.next(message)
        break
    }
  }
}
