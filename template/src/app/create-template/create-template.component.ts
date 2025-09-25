import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
  FormControl,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { TemplateService } from "../services/template.service";

@Component({
  selector: "app-create-template",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="create-template-container">
      <div class="header">
        <h1>Create New Template</h1>
        <a routerLink="/template" class="btn btn-outline">Back to List</a>
      </div>

      <form [formGroup]="templateForm" (ngSubmit)="onSubmit()" class="template-form">
        <div class="form-grid">
          <!-- Name -->
          <div class="form-group">
            <label for="name">Template Name *</label>
            <input
              id="name"
              type="text"
              class="form-control"
              formControlName="name"
              placeholder="Enter template name"
            />
            <div
              class="error-message"
              *ngIf="templateForm.get('name')?.invalid && templateForm.get('name')?.touched"
            >
              Template name is required
            </div>
          </div>

          <!-- Category -->
          <div class="form-group">
            <label for="category">Category *</label>
            <select id="category" formControlName="category" class="form-control">
              <option value="">Select Category</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="push">Push Notification</option>
              <option value="web">Web</option>
            </select>
            <div
              class="error-message"
              *ngIf="templateForm.get('category')?.invalid && templateForm.get('category')?.touched"
            >
              Category is required
            </div>
          </div>

          <!-- Description -->
          <div class="form-group full-width">
            <label for="description">Description</label>
            <input
              id="description"
              type="text"
              class="form-control"
              formControlName="description"
              placeholder="Short description (optional)"
            />
          </div>

          <!-- Content -->
          <div class="form-group full-width">
            <label for="content">Content *</label>
            <textarea
              id="content"
              class="form-control"
              rows="8"
              formControlName="content"
              [attr.placeholder]="'Write your template content here. Example: Hello {{firstName}}'"
            ></textarea>
            
            <div
              class="error-message"
              *ngIf="templateForm.get('content')?.invalid && templateForm.get('content')?.touched"
            >
              Content is required
            </div>
          </div>

          <!-- Placeholders (FormArray) -->
          <div class="form-group full-width">
            <div class="group-header">
              <label>Placeholders</label>
              <button type="button" class="btn btn-outline" (click)="addPlaceholder()">
                + Add Placeholder
              </button>
            </div>

            <div formArrayName="placeholders" class="placeholders">
              <div
                class="placeholder-row"
                *ngFor="let ph of placeholders.controls; let i = index; trackBy: trackByIndex"
                [formGroupName]="i"
              >
                <div class="placeholder-col">
                  <label for="ph-key-{{ i }}">Key</label>
                  <input
                    [id]="'ph-key-' + i"
                    type="text"
                    class="form-control"
                    formControlName="key"
                    placeholder="e.g. firstName"
                  />
                </div>
                <div class="placeholder-col">
                  <label for="ph-value-{{ i }}">Sample Value</label>
                  <input
                    [id]="'ph-value-' + i"
                    type="text"
                    class="form-control"
                    formControlName="value"
                    placeholder="e.g. John"
                  />
                </div>
                <div class="placeholder-actions">
                  <button
                    type="button"
                    class="btn btn-danger"
                    (click)="removePlaceholder(i)"
                    aria-label="Remove Placeholder"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <div class="helper-text">
              Use placeholders like <code>{{'{{firstName}}'}}</code> in content.
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button
            type="submit"
            class="btn btn-primary"
            [disabled]="templateForm.invalid || isSubmitting"
          >
            {{ isSubmitting ? 'Saving...' : 'Create Template' }}
          </button>
          <a routerLink="/template" class="btn btn-outline">Cancel</a>
        </div>
      </form>
    </div>
  `,
  styleUrls: ["./create-template.component.scss"],
})
export class CreateTemplateComponent {
  templateForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private templateService: TemplateService
  ) {
    this.templateForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: [''],
      content: ['', Validators.required],
      placeholders: this.fb.array([]),
    });
  }

  get placeholders(): FormArray {
    return this.templateForm.get('placeholders') as FormArray;
  }

  addPlaceholder(): void {
    const group = this.fb.group({
      key: [''],
      value: [''],
    });
    this.placeholders.push(group);
  }

  removePlaceholder(index: number): void {
    this.placeholders.removeAt(index);
  }

  trackByIndex(index: number): number {
    return index;
  }

  onSubmit(): void {
    if (this.templateForm.invalid) {
      this.templateForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const templateData = {
      ...this.templateForm.value,
      // có thể chuyển placeholders array -> object nếu BE yêu cầu
    };

    this.templateService.createTemplate(templateData).subscribe({
      next: () => {
        this.router.navigate(['/template']);
      },
      error: (error) => {
        console.error('Error creating template:', error);
        this.isSubmitting = false;
      },
    });
  }
}
