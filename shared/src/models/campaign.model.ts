export interface Campaign {
  id: string
  name: string
  description: string
  status: CampaignStatus
  startDate: Date
  endDate: Date
  budget: number
  targetAudience: string[]
  createdBy: string
  createdAt: Date
  updatedAt: Date
  metrics?: CampaignMetrics
}

export interface CampaignMetrics {
  impressions: number
  clicks: number
  conversions: number
  ctr: number // Click-through rate
  cpc: number // Cost per click
  roi: number // Return on investment
}

export enum CampaignStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  PAUSED = "paused",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface CampaignFilter {
  status?: CampaignStatus[]
  dateRange?: {
    start: Date
    end: Date
  }
  budgetRange?: {
    min: number
    max: number
  }
  searchTerm?: string
}

export interface CreateCampaignRequest {
  name: string
  description: string
  startDate: Date
  endDate: Date
  budget: number
  targetAudience: string[]
}

export interface UpdateCampaignRequest extends Partial<CreateCampaignRequest> {
  id: string
  status?: CampaignStatus
}
