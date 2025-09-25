import { Component } from "@angular/core"
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="shell-container">
      <header class="shell-header">
        <nav class="shell-nav">
          <h1 class="shell-title">Micro Frontend System</h1>
          <ul class="shell-nav-list">
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
            <li><a routerLink="/campaign" routerLinkActive="active">Campaign</a></li>
            <li><a routerLink="/template" routerLinkActive="active">Template</a></li>
          </ul>
        </nav>
      </header>
      
      <main class="shell-main">
        <router-outlet></router-outlet>
      </main>
      
      <footer class="shell-footer">
        <p>&copy; 2025 Micro Frontend System</p>
      </footer>
    </div>
  `,
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "shell"
}
