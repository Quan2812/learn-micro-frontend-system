export interface Campaign {
  id: string
  name: string
  description: string
  status: "draft" | "active" | "paused" | "completed"
  startDate: Date
  endDate: Date
  budget: number
  targetAudience: string
  createdAt: Date
  updatedAt: Date
}

export interface CampaignStats {
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  cpc: number
  roi: number
}
