import { Injectable } from "@angular/core"
import type { Router } from "@angular/router"

// Service to communicate with shell application
@Injectable({
  providedIn: "root",
})
export class ShellCommunicationService {
  constructor(private router: Router) {}

  // Navigate to other micro frontends through shell
  navigateToCampaign(route = ""): void {
    this.emitToShell("NAVIGATE", {
      target: "campaign",
      route: route ? `/campaign/${route}` : "/campaign",
    })
  }

  navigateToHome(): void {
    this.emitToShell("NAVIGATE", {
      target: "shell",
      route: "/",
    })
  }

  // Notify shell of data changes
  notifyDataChange(entityType: string, action: "create" | "update" | "delete", data: any): void {
    this.emitToShell("DATA_CHANGE", {
      entityType,
      action,
      data,
      source: "template",
    })
  }

  // Emit events to shell application
  private emitToShell(type: string, data: any): void {
    // Use custom event to communicate with shell
    const event = new CustomEvent("mfe-communication", {
      detail: {
        type,
        source: "template",
        data,
        timestamp: new Date(),
      },
    })
    window.dispatchEvent(event)
  }

  // Listen for events from shell
  listenToShell(callback: (event: any) => void): void {
    window.addEventListener("shell-communication", (event: any) => {
      callback(event.detail)
    })
  }
}
