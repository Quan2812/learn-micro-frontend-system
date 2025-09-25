import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <div class="hero-section">
        <h1>Welcome to Micro Frontend System</h1>
        <p class="hero-description">
          A modern Angular 18.2.0 application built with Module Federation architecture.
          Each feature is developed and deployed independently.
        </p>
      </div>
      
      <div class="features-grid">
        <div class="feature-card">
          <h3>Campaign Management</h3>
          <p>Manage your marketing campaigns with powerful tools and analytics.</p>
          <a routerLink="/campaign" class="feature-link">Go to Campaign →</a>
        </div>
        
        <div class="feature-card">
          <h3>Template Management</h3>
          <p>Create and manage reusable templates for your campaigns.</p>
          <a routerLink="/template" class="feature-link">Go to Template →</a>
        </div>
      </div>
      
      <div class="architecture-info">
        <h2>Architecture Overview</h2>
        <ul>
          <li><strong>Shell App:</strong> Main host application (Port 4200)</li>
          <li><strong>Campaign MFE:</strong> Independent micro frontend (Port 4201)</li>
          <li><strong>Template MFE:</strong> Independent micro frontend (Port 4202)</li>
          <li><strong>Shared Library:</strong> Common services and styles</li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {}
