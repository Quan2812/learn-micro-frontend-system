import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable } from "rxjs"

export interface MicroFrontendEvent {
  type: string
  source: string
  data: any
  timestamp: Date
}

@Injectable({
  providedIn: "root",
})
export class MicroFrontendCommunicationService {
  private eventSubject = new BehaviorSubject<MicroFrontendEvent | null>(null)
  private navigationSubject = new BehaviorSubject<string>("")

  // Event communication between micro frontends
  get events$(): Observable<MicroFrontendEvent | null> {
    return this.eventSubject.asObservable()
  }

  // Navigation state sharing
  get currentRoute$(): Observable<string> {
    return this.navigationSubject.asObservable()
  }

  // Emit events to other micro frontends
  emitEvent(type: string, source: string, data: any): void {
    const event: MicroFrontendEvent = {
      type,
      source,
      data,
      timestamp: new Date(),
    }
    this.eventSubject.next(event)
  }

  // Update current navigation state
  updateNavigation(route: string): void {
    this.navigationSubject.next(route)
  }

  // Specific event types for common operations
  notifyDataChange(source: string, entityType: string, action: "create" | "update" | "delete", data: any): void {
    this.emitEvent("DATA_CHANGE", source, {
      entityType,
      action,
      data,
    })
  }

  notifyUserAction(source: string, action: string, data: any): void {
    this.emitEvent("USER_ACTION", source, {
      action,
      data,
    })
  }

  notifyError(source: string, error: any): void {
    this.emitEvent("ERROR", source, {
      error: error.message || error,
      stack: error.stack,
    })
  }

  // // Cross micro frontend navigation
  // navigateToMicroFrontend(mfe: string, route = ""): void {
  //   const fullRoute = route ? `/${mfe}/${route}` : `/${mfe}`
  //   this.emitEvent("NAVIGATE", "shell", {
  //     target: mfe,
  //     route: fullRoute,
  //   })
  // }
}
