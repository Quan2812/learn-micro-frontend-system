import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { FormsModule } from "@angular/forms"
import type { Observable } from "rxjs"
import type { Template } from "../models/template.model"
import type { TemplateService } from "../services/template.service"

@Component({
  selector: "app-template-list",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="template-list-container">
      <div class="header">
        <h1>Template Management</h1>
        <a routerLink="/template/create" class="btn btn-primary">Create New Template</a>
      </div>
      
      <div class="filters">
        <div class="filter-group">
          <label for="categoryFilter">Category:</label>
          <select id="categoryFilter" [(ngModel)]="selectedCategory" (change)="filterTemplates()" class="form-control">
            <option value="">All Categories</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="push">Push Notification</option>
            <option value="web">Web</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label for="statusFilter">Status:</label>
          <select id="statusFilter" [(ngModel)]="selectedStatus" (change)="filterTemplates()" class="form-control">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label for="searchFilter">Search:</label>
          <input 
            type="text" 
            id="searchFilter" 
            [(ngModel)]="searchTerm" 
            (input)="filterTemplates()"
            placeholder="Search templates..."
            class="form-control"
          >
        </div>
      </div>
      
      <div class="templates-grid" *ngIf="filteredTemplates.length > 0">
        <div class="template-card" *ngFor="let template of filteredTemplates">
          <div class="template-header">
            <h3>{{ template.name }}</h3>
            <div class="template-badges">
              <span class="category-badge" [class]="'category-' + template.category">
                {{ template.category | titlecase }}
              </span>
              <span class="status-badge" [class]="'status-' + template.status">
                {{ template.status | titlecase }}
              </span>
            </div>
          </div>
          
          <p class="template-description">{{ template.description }}</p>
          
          <div class="template-tags" *ngIf="template.tags.length > 0">
            <span class="tag" *ngFor="let tag of template.tags">{{ tag }}</span>
          </div>
          
          <div class="template-stats">
            <div class="stat-item">
              <span class="label">Variables:</span>
              <span class="value">{{ template.variables.length }}</span>
            </div>
            <div class="stat-item">
              <span class="label">Usage:</span>
              <span class="value">{{ template.usageCount }}</span>
            </div>
            <div class="stat-item">
              <span class="label">Updated:</span>
              <span class="value">{{ template.updatedAt | date:'MMM d, y' }}</span>
            </div>
          </div>
          
          <div class="template-actions">
            <a [routerLink]="['/template/detail', template.id]" class="btn btn-outline">View</a>
            <a [routerLink]="['/template/editor', template.id]" class="btn btn-primary">Edit</a>
            <button class="btn btn-danger" (click)="deleteTemplate(template.id)">Delete</button>
          </div>
        </div>
      </div>
      
      <div class="empty-state" *ngIf="filteredTemplates.length === 0">
        <h3>No templates found</h3>
        <p *ngIf="hasActiveFilters()">Try adjusting your filters or search terms.</p>
        <p *ngIf="!hasActiveFilters()">Create your first template to get started.</p>
        <a routerLink="/template/create" class="btn btn-primary">Create Template</a>
      </div>
    </div>
  `,
  styleUrls: ["./template-list.component.scss"],
})
export class TemplateListComponent implements OnInit {
  templates$: Observable<Template[]>
  filteredTemplates: Template[] = []
  allTemplates: Template[] = []

  selectedCategory = ""
  selectedStatus = ""
  searchTerm = ""

  constructor(private templateService: TemplateService) {
    this.templates$ = this.templateService.getTemplates()
  }

  ngOnInit(): void {
    this.templates$.subscribe((templates) => {
      this.allTemplates = templates
      this.filteredTemplates = templates
    })
  }

  filterTemplates(): void {
    this.filteredTemplates = this.allTemplates.filter((template) => {
      const matchesCategory = !this.selectedCategory || template.category === this.selectedCategory
      const matchesStatus = !this.selectedStatus || template.status === this.selectedStatus
      const matchesSearch =
        !this.searchTerm ||
        template.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        template.tags.some((tag) => tag.toLowerCase().includes(this.searchTerm.toLowerCase()))

      return matchesCategory && matchesStatus && matchesSearch
    })
  }

  hasActiveFilters(): boolean {
    return !!(this.selectedCategory || this.selectedStatus || this.searchTerm)
  }

  deleteTemplate(id: string): void {
    if (confirm("Are you sure you want to delete this template?")) {
      this.templateService.deleteTemplate(id).subscribe(() => {
        this.filterTemplates()
      })
    }
  }
}
