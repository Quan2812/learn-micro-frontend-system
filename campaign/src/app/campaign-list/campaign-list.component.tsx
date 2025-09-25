import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import type { Observable } from "rxjs"
import type { Campaign } from "shared/src/models/campaign.model"
import type { CampaignService } from "../services/campaign.service"

@Component({
  selector: "app-campaign-list",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="campaign-list-container">
      <div class="header">
        <h1>Campaign Management</h1>
        <a routerLink="/campaign/create" class="btn btn-primary">Create New Campaign</a>
      </div>
      
      <div class="campaigns-grid" *ngIf="campaigns$ | async as campaigns">
        <div class="campaign-card" *ngFor="let campaign of campaigns">
          <div class="campaign-header">
            <h3>{{ campaign.name }}</h3>
            <span class="status-badge" [ngClass]="'status-' + campaign.status">
              {{ campaign.status | titlecase }}
            </span>
          </div>
          
          <p class="campaign-description">{{ campaign.description }}</p>
          
          <div class="campaign-details">
            <div class="detail-item">
              <span class="label">Budget:</span>
              <span class="value">{{ campaign.budget | currency:'USD':'symbol':'1.0-0' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Target:</span>
              <!-- Handle array format for targetAudience -->
              <span class="value">{{ campaign.targetAudience.join(', ') }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Duration:</span>
              <span class="value">
                {{ campaign.startDate | date:'MMM d' }} - {{ campaign.endDate | date:'MMM d, y' }}
              </span>
            </div>
          </div>
          
          <div class="campaign-actions">
            <a [routerLink]="['/campaign/detail', campaign.id]" class="btn btn-outline">View Details</a>
            <button class="btn btn-danger" (click)="deleteCampaign(campaign.id)">Delete</button>
          </div>
        </div>
      </div>
      
      <div class="empty-state" *ngIf="(campaigns$ | async)?.length === 0">
        <h3>No campaigns found</h3>
        <p>Create your first campaign to get started.</p>
        <a routerLink="/campaign/create" class="btn btn-primary">Create Campaign</a>
      </div>
    </div>
  `,
  styleUrls: ["./campaign-list.component.scss"],
})
export class CampaignListComponent implements OnInit {
  campaigns$: Observable<Campaign[]>

  constructor(private campaignService: CampaignService) {
    this.campaigns$ = this.campaignService.getCampaigns()
  }

  ngOnInit(): void {}

  deleteCampaign(id: string): void {
    if (confirm("Are you sure you want to delete this campaign?")) {
      this.campaignService.deleteCampaign(id).subscribe()
    }
  }
}
