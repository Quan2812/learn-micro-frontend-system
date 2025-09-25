import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { type FormBuilder, type FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { type Router, RouterLink } from "@angular/router"
import type { CampaignService } from "../services/campaign.service"

@Component({
  selector: "app-create-campaign",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="create-campaign-container">
      <div class="header">
        <h1>Create New Campaign</h1>
        <a routerLink="/campaign" class="btn btn-outline">Back to List</a>
      </div>
      
      <form [formGroup]="campaignForm" (ngSubmit)="onSubmit()" class="campaign-form">
        <div class="form-group">
          <label for="name">Campaign Name *</label>
          <input 
            type="text" 
            id="name" 
            formControlName="name"
            class="form-control"
            [class.error]="campaignForm.get('name')?.invalid && campaignForm.get('name')?.touched"
          >
          <div class="error-message" *ngIf="campaignForm.get('name')?.invalid && campaignForm.get('name')?.touched">
            Campaign name is required
          </div>
        </div>
        
        <div class="form-group">
          <label for="description">Description *</label>
          <textarea 
            id="description" 
            formControlName="description"
            class="form-control"
            rows="3"
            [class.error]="campaignForm.get('description')?.invalid && campaignForm.get('description')?.touched"
          ></textarea>
          <div class="error-message" *ngIf="campaignForm.get('description')?.invalid && campaignForm.get('description')?.touched">
            Description is required
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="startDate">Start Date *</label>
            <input 
              type="date" 
              id="startDate" 
              formControlName="startDate"
              class="form-control"
              [class.error]="campaignForm.get('startDate')?.invalid && campaignForm.get('startDate')?.touched"
            >
            <div class="error-message" *ngIf="campaignForm.get('startDate')?.invalid && campaignForm.get('startDate')?.touched">
              Start date is required
            </div>
          </div>
          
          <div class="form-group">
            <label for="endDate">End Date *</label>
            <input 
              type="date" 
              id="endDate" 
              formControlName="endDate"
              class="form-control"
              [class.error]="campaignForm.get('endDate')?.invalid && campaignForm.get('endDate')?.touched"
            >
            <div class="error-message" *ngIf="campaignForm.get('endDate')?.invalid && campaignForm.get('endDate')?.touched">
              End date is required
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="budget">Budget ($) *</label>
            <input 
              type="number" 
              id="budget" 
              formControlName="budget"
              class="form-control"
              min="0"
              step="100"
              [class.error]="campaignForm.get('budget')?.invalid && campaignForm.get('budget')?.touched"
            >
            <div class="error-message" *ngIf="campaignForm.get('budget')?.invalid && campaignForm.get('budget')?.touched">
              Budget must be greater than 0
            </div>
          </div>
          
          <div class="form-group">
            <label for="status">Status</label>
            <select id="status" formControlName="status" class="form-control">
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
            </select>
          </div>
        </div>
        
        <div class="form-group">
          <label for="targetAudience">Target Audience *</label>
          <input 
            type="text" 
            id="targetAudience" 
            formControlName="targetAudience"
            class="form-control"
            placeholder="e.g., Adults 25-45, Students, etc."
            [class.error]="campaignForm.get('targetAudience')?.invalid && campaignForm.get('targetAudience')?.touched"
          >
          <div class="error-message" *ngIf="campaignForm.get('targetAudience')?.invalid && campaignForm.get('targetAudience')?.touched">
            Target audience is required
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" routerLink="/campaign" class="btn btn-outline">Cancel</button>
          <button type="submit" class="btn btn-primary" [disabled]="campaignForm.invalid || isSubmitting">
            {{ isSubmitting ? 'Creating...' : 'Create Campaign' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ["./create-campaign.component.scss"],
})
export class CreateCampaignComponent {
  campaignForm: FormGroup
  isSubmitting = false

  constructor(
    private fb: FormBuilder,
    private campaignService: CampaignService,
    private router: Router,
  ) {
    this.campaignForm = this.fb.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      budget: [0, [Validators.required, Validators.min(1)]],
      status: ["draft"],
      targetAudience: ["", [Validators.required]],
    })
  }

  onSubmit(): void {
    if (this.campaignForm.valid) {
      this.isSubmitting = true

      const formValue = this.campaignForm.value
      const campaignData = {
        ...formValue,
        startDate: new Date(formValue.startDate),
        endDate: new Date(formValue.endDate),
      }

      this.campaignService.createCampaign(campaignData).subscribe({
        next: () => {
          this.router.navigate(["/campaign"])
        },
        error: (error) => {
          console.error("Error creating campaign:", error)
          this.isSubmitting = false
        },
      })
    }
  }
}
