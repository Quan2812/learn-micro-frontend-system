import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { type ActivatedRoute, RouterLink } from "@angular/router"
import { FormsModule } from "@angular/forms"
import type { Observable } from "rxjs"
import type { Template } from "../models/template.model"
import type { TemplateService } from "../services/template.service"

@Component({
  selector: "app-template-detail",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="template-detail-container">
      <div class="header">
        <h1>Template Details</h1>
        <div class="header-actions">
          <a [routerLink]="['/template/editor', templateId]" class="btn btn-primary">Edit Template</a>
          <a routerLink="/template" class="btn btn-outline">Back to List</a>
        </div>
      </div>
      
      <div *ngIf="template$ | async as template" class="template-detail">
        <div class="template-info">
          <div class="info-header">
            <h2>{{ template.name }}</h2>
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
          
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Category</span>
              <span class="value">{{ template.category | titlecase }}</span>
            </div>
            <div class="info-item">
              <span class="label">Status</span>
              <span class="value">{{ template.status | titlecase }}</span>
            </div>
            <div class="info-item">
              <span class="label">Variables</span>
              <span class="value">{{ template.variables.length }}</span>
            </div>
            <div class="info-item">
              <span class="label">Usage Count</span>
              <span class="value">{{ template.usageCount }}</span>
            </div>
            <div class="info-item">
              <span class="label">Created</span>
              <span class="value">{{ template.createdAt | date:'medium' }}</span>
            </div>
            <div class="info-item">
              <span class="label">Last Updated</span>
              <span class="value">{{ template.updatedAt | date:'medium' }}</span>
            </div>
          </div>
        </div>
        
        <div class="template-content">
          <h3>Template Content</h3>
          <div class="content-display">
            <pre>{{ template.content }}</pre>
          </div>
        </div>
        
        <div class="template-variables" *ngIf="template.variables.length > 0">
          <h3>Variables</h3>
          <div class="variables-grid">
            <div class="variable-card" *ngFor="let variable of template.variables">
              <div class="variable-header">
                <h4>{{ variable.name }}</h4>
                <span class="variable-type">{{ variable.type }}</span>
              </div>
              <p class="variable-description" *ngIf="variable.description">{{ variable.description }}</p>
              <div class="variable-details">
                <div class="detail-item" *ngIf="variable.defaultValue">
                  <span class="label">Default:</span>
                  <span class="value">{{ variable.defaultValue }}</span>
                </div>
                <div class="detail-item">
                  <span class="label">Required:</span>
                  <span class="value">{{ variable.required ? 'Yes' : 'No' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="template-preview">
          <h3>Preview</h3>
          <div class="preview-controls" *ngIf="template.variables.length > 0">
            <h4>Variable Values</h4>
            <div class="variable-inputs">
              <div class="input-group" *ngFor="let variable of template.variables">
                <label>{{ variable.name }}{{ variable.required ? ' *' : '' }}</label>
                <input 
                  type="text" 
                  [(ngModel)]="previewVariables[variable.name]"
                  [placeholder]="variable.defaultValue || 'Enter ' + variable.name"
                  (input)="updatePreview(template)"
                  class="form-control"
                >
              </div>
            </div>
          </div>
          
          <div class="preview-output">
            <h4>Preview Output</h4>
            <div class="preview-content" [innerHTML]="previewContent"></div>
          </div>
        </div>
      </div>
      
      <div *ngIf="!(template$ | async)" class="not-found">
        <h3>Template not found</h3>
        <p>The requested template could not be found.</p>
        <a routerLink="/template" class="btn btn-primary">Back to List</a>
      </div>
    </div>
  `,
  styleUrls: ["./template-detail.component.scss"],
})
export class TemplateDetailComponent implements OnInit {
  template$: Observable<Template | undefined>
  templateId: string
  previewVariables: Record<string, any> = {}
  previewContent = ""

  constructor(
    private route: ActivatedRoute,
    private templateService: TemplateService,
  ) {
    this.templateId = this.route.snapshot.params["id"]
    this.template$ = this.templateService.getTemplateById(this.templateId)
  }

  ngOnInit(): void {
    this.template$.subscribe((template) => {
      if (template) {
        // Initialize preview variables with default values
        template.variables.forEach((variable) => {
          this.previewVariables[variable.name] = variable.defaultValue || ""
        })
        this.updatePreview(template)
      }
    })
  }

  updatePreview(template: Template): void {
    this.templateService.previewTemplate(template, this.previewVariables).subscribe((preview) => {
      this.previewContent = preview.content
    })
  }
}
