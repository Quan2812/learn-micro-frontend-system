import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { type Router, RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from "@angular/router"
import type { MicroFrontendCommunicationService } from "./services/micro-frontend-communication.service"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  title = "Micro Frontend Shell"
  currentRoute = ""

  constructor(
    private router: Router,
    private communicationService: MicroFrontendCommunicationService,
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url
        this.communicationService.updateNavigation(event.url)
      }
    })

    this.communicationService.events$.subscribe((event) => {
      if (event?.type === "NAVIGATE" && event.source !== "shell") {
        this.router.navigate([event.data.route])
      }
    })
  }
}
