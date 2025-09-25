import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { type FormBuilder, type FormGroup, Validators, ReactiveFormsModule, type FormArray } from "@angular/forms"
import { type ActivatedRoute, type Router, RouterLink } from "@angular/router"
import type { TemplateService } from "../services/template.service"
import type { Template } from "../models/template.model"

@Component({
  selector: "app-template-editor",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="template-editor-container">
      <div class="header">
        <h1>Edit Template</h1>
        <div class="header-actions">
          <a [routerLink]="['/template/detail', templateId]" class="btn btn-outline">View Details</a>
          <a routerLink="/template" class="btn btn-outline">Back to List</a>
        </div>
      </div>
      
      <form [formGroup]="templateForm" (ngSubmit)="onSubmit()" class="template-form" *ngIf="templateForm">
        <div class="form-section">
          <h3>Basic Information</h3>
          
          <div class="form-row">
            <div class="form-group">
              <label for="name">Template Name *</label>
              <input 
                type="text" 
                id="name" 
                formControlName="name"
                class="form-control"
                [class.error]="templateForm.get('name')?.invalid && templateForm.get('name')?.touched"
              >
              <div class="error-message" *ngIf="templateForm.get('name')?.invalid && templateForm.get('name')?.touched">
                Template name is required
              </div>
            </div>
            
            <div class="form-group">
              <label for="category">Category *</label>
              <select id="category" formControlName="category" class="form-control">
                <option value="">Select Category</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="push">Push Notification</option>
                <option value="web">Web</option>
              </select>
              <div class="error-message" *ngIf="templateForm.get('category')?.invalid && templateForm.get('category')?.touched">
                Category is required
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="description">Description *</label>
            <textarea 
              id="description" 
              formControlName="description"
              class="form-control"
              rows="3"
              [class.error]="templateForm.get('description')?.invalid && templateForm.get('description')?.touched"
            ></textarea>
            <div class="error-message" *ngIf="templateForm.get('description')?.invalid && templateForm.get('description')?.touched">
              Description is required
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="status">Status</label>
              <select id="status" formControlName="status" class="form-control">
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="tags">Tags (comma-separated)</label>
              <input 
                type="text" 
                id="tags" 
                formControlName="tags"
                class="form-control"
                placeholder="e.g., welcome, onboarding, email"
              >
            </div>
          </div>
        </div>
        
        <div class="form-section">
          <h3>Template Content</h3>
          <div class="form-group">
            <label for="content">Content *</label>
            <textarea 
              id="content" 
              formControlName="content"
              class="form-control content-editor"
              rows="12"
              placeholder="Enter your template content here. Use {{variableName}} for dynamic content."
              [class.error]="templateForm.get('content')?.invalid && templateForm.get('content')?.touched"
            ></textarea>
            <div class="help-text">
              Use double curly braces for variables: {{variableName}}
            </div>
            <div class="error-message" *ngIf="templateForm.get('content')?.invalid && templateForm.get('content')?.touched">
              Content is required
            </div>
          </div>
        </div>
        
        <div class="form-section">
          <div class="section-header">
            <h3>Variables</h3>
            <button type="button" (click)="addVariable()" class="btn btn-outline btn-sm">Add Variable</button>
          </div>
          
          <div formArrayName="variables" class="variables-list">
            <div *ngFor="let variable of variables.controls; let i = index" [formGroupName]="i" class="variable-item">
              <div class="variable-header">
                <h4>Variable {{ i + 1 }}</h4>
                <button type="button" (click)="removeVariable(i)" class="btn btn-danger btn-sm">Remove</button>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label>Name *</label>
                  <input type="text" formControlName="name" class="form-control" placeholder="variableName">
                </div>
                
                <div class="form-group">
                  <label>Type</label>
                  <select formControlName="type" class="form-control">
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                    <option value="boolean">Boolean</option>
                  </select>
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label>Default Value</label>
                  <input type="text" formControlName="defaultValue" class="form-control">
                </div>
                
                <div class="form-group checkbox-group">
                  <label>
                    <input type="checkbox" formControlName="required">
                    Required
                  </label>
                </div>
              </div>
              
              <div class="form-group">
                <label>Description</label>
                <input type="text" formControlName="description" class="form-control" placeholder="Variable description">
              </div>
            </div>
          </div>
          
          <div *ngIf="variables.length === 0" class="empty-variables">
            <p>No variables defined. Add variables to make your template dynamic.</p>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" [routerLink]="['/template/detail', templateId]" class="btn btn-outline">Cancel</button>
          <button type="submit" class="btn btn-primary" [disabled]="templateForm.invalid || isSubmitting">
            {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </form>
      
      <div *ngIf="!templateForm" class="loading">
        Loading template...
      </div>
    </div>
  `,
  styleUrls: ["./template-editor.component.scss"],
})
export class TemplateEditorComponent implements OnInit {
  templateForm!: FormGroup
  templateId: string
  isSubmitting = false

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private templateService: TemplateService,
  ) {
    this.templateId = this.route.snapshot.params["id"]
  }

  ngOnInit(): void {
    this.loadTemplate()
  }

  loadTemplate(): void {
    this.templateService.getTemplateById(this.templateId).subscribe((template) => {
      if (template) {
        this.initializeForm(template)
      } else {
        this.router.navigate(["/template"])
      }
    })
  }

  initializeForm(template: Template): void {
    this.templateForm = this.fb.group({
      name: [template.name, [Validators.required]],
      description: [template.description, [Validators.required]],
      category: [template.category, [Validators.required]],
      content: [template.content, [Validators.required]],
      status: [template.status],
      tags: [template.tags.join(", ")],
      variables: this.fb.array([]),
    })

    // Add existing variables
    template.variables.forEach((variable) => {
      this.addVariableWithData(variable)
    })
  }

  get variables() {
    return this.templateForm.get("variables") as FormArray
  }

  addVariable(): void {
    const variableGroup = this.fb.group({
      name: ["", [Validators.required]],
      type: ["text"],
      defaultValue: [""],
      required: [false],
      description: [""],
    })

    this.variables.push(variableGroup)
  }

  addVariableWithData(variable: any): void {
    const variableGroup = this.fb.group({
      name: [variable.name, [Validators.required]],
      type: [variable.type],
      defaultValue: [variable.defaultValue || ""],
      required: [variable.required],
      description: [variable.description || ""],
    })

    this.variables.push(variableGroup)
  }

  removeVariable(index: number): void {
    this.variables.removeAt(index)
  }

  onSubmit(): void {
    if (this.templateForm.valid) {
      this.isSubmitting = true

      const formValue = this.templateForm.value
      const templateData = {
        ...formValue,
        tags: formValue.tags
          ? formValue.tags
              .split(",")
              .map((tag: string) => tag.trim())
              .filter((tag: string) => tag)
          : [],
        variables: formValue.variables || [],
      }

      this.templateService.updateTemplate(this.templateId, templateData).subscribe({
        next: () => {
          this.router.navigate(["/template/detail", this.templateId])
        },
        error: (error) => {
          console.error("Error updating template:", error)
          this.isSubmitting = false
        },
      })
    }
  }
}
