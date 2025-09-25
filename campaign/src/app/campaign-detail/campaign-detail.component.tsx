import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { type ActivatedRoute, RouterLink } from "@angular/router"
import type { Observable } from "rxjs"
import type { Campaign, CampaignStats } from "../models/campaign.model"
import type { CampaignService } from "../services/campaign.service"

@Component({
  selector: 'app-campaign-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="campaign-detail-container">
      <div class="header">
        <h1>Campaign Details</h1>
        <a routerLink="/campaign" class="btn btn-outline">Back to List</a>
      </div>
      
      <div *ngIf="campaign$ | async as campaign" class="campaign-detail">
        <div class="campaign-info">
          <div class="info-header">
            <h2>{{ campaign.name }}</h2>
            <span class="status-badge" [class]="'status-' + campaign.status">
              {{ campaign.status | titlecase }}
            </span>
          </div>
          
          <p class="campaign-description">{{ campaign.description }}</p>
          
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Budget</span>
              <span class="value\">${{ campaign.budget | number }}</span>
            </div>
            <div class="info-item">
              <span class="label">Target Audience</span>
              <span class="value">{{ campaign.targetAudience }}</span>
            </div>
            <div class="info-item">
              <span class="label">Start Date</span>
              <span class="value">{{ campaign.startDate | date:'fullDate' }}</span>
            </div>
            <div class="info-item">
              <span class="label">End Date</span>
              <span class="value">{{ campaign.endDate | date:'fullDate' }}</span>
            </div>
            <div class="info-item">
              <span class="label">Created</span>
              <span class="value">{{ campaign.createdAt | date:'medium' }}</span>
            </div>
            <div class="info-item">
              <span class="label">Last Updated</span>
              <span class="value">{{ campaign.updatedAt | date:'medium' }}</span>
            </div>
          </div>
        </div>
        
        <div class="campaign-stats" *ngIf="stats$ | async as stats">
          <h3>Performance Statistics</h3>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value">{{ stats.impressions | number }}</div>
              <div class="stat-label">Impressions</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ stats.clicks | number }}</div>
              <div class="stat-label">Clicks</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ stats.conversions | number }}</div>
              <div class="stat-label">Conversions</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ stats.ctr | number:'1.2-2' }}%</div>
              <div class="stat-label">CTR</div>
            </div>
            <div class="stat-card">
              <div class="stat-value\">${{ stats.cpc | number:'1.2-2' }}</div>
              <div class="stat-label">CPC</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ stats.roi | number:'1.0-0' }}%</div>
              <div class="stat-label">ROI</div>
            </div>
          </div>
        </div>
      </div>
      
      <div *ngIf="!(campaign$ | async)" class="not-found">
        <h3>Campaign not found</h3>
        <p>The requested campaign could not be found.</p>
        <a routerLink="/campaign" class="btn btn-primary">Back to List</a>
      </div>
    </div>
  `,
  styleUrls: ['./campaign-detail.component.scss']
})
export class CampaignDetailComponent implements OnInit {
  campaign$: Observable<Campaign | undefined>
  stats$: Observable<CampaignStats>
  campaignId: string

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService,
  ) {
    this.campaignId = this.route.snapshot.params["id"]
    this.campaign$ = this.campaignService.getCampaignById(this.campaignId)
    this.stats$ = this.campaignService.getCampaignStats(this.campaignId)
  }

  ngOnInit(): void {}
}
