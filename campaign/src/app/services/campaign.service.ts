import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable, of } from "rxjs"
import type { Campaign, CampaignMetrics, CampaignStatus } from "../models/campaign.model"

@Injectable({
  providedIn: "root",
})
export class CampaignService {
  private campaignsSubject = new BehaviorSubject<Campaign[]>(this.getMockCampaigns())
  public campaigns$ = this.campaignsSubject.asObservable()

  constructor() {}

  getCampaigns(): Observable<Campaign[]> {
    return this.campaigns$
  }

  getCampaignById(id: string): Observable<Campaign | undefined> {
    const campaigns = this.campaignsSubject.value
    const campaign = campaigns.find((c) => c.id === id)
    return of(campaign)
  }

  createCampaign(campaign: Omit<Campaign, "id" | "createdAt" | "updatedAt" | "createdBy">): Observable<Campaign> {
    const newCampaign: Campaign = {
      ...campaign,
      id: this.generateId(),
      createdBy: "current-user", // TODO: Get from auth service
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const currentCampaigns = this.campaignsSubject.value
    this.campaignsSubject.next([...currentCampaigns, newCampaign])

    return of(newCampaign)
  }

  updateCampaign(id: string, updates: Partial<Campaign>): Observable<Campaign | null> {
    const campaigns = this.campaignsSubject.value
    const index = campaigns.findIndex((c) => c.id === id)

    if (index === -1) {
      return of(null)
    }

    const updatedCampaign = {
      ...campaigns[index],
      ...updates,
      updatedAt: new Date(),
    }

    campaigns[index] = updatedCampaign
    this.campaignsSubject.next([...campaigns])

    return of(updatedCampaign)
  }

  deleteCampaign(id: string): Observable<boolean> {
    const campaigns = this.campaignsSubject.value
    const filteredCampaigns = campaigns.filter((c) => c.id !== id)
    this.campaignsSubject.next(filteredCampaigns)
    return of(true)
  }
  private getMockCampaigns(): Campaign[] {
    return [
      {
        id: "1",
        name: "Summer Sale 2025",
        description: "Promote summer products with special discounts",
        status: "ACTIVE" as CampaignStatus,
        startDate: new Date("2025-06-01"),
        endDate: new Date("2025-08-31"),
        budget: 50000,
        targetAudience: ["Adults 25-45"],
        createdBy: "admin",
        createdAt: new Date("2025-05-15"),
        updatedAt: new Date("2025-05-15"),
      },
      {
        id: "2",
        name: "Back to School",
        description: "Target students and parents for school supplies",
        status: "DRAFT" as CampaignStatus,
        startDate: new Date("2025-08-01"),
        endDate: new Date("2025-09-15"),
        budget: 30000,
        targetAudience: ["Students", "Parents"],
        createdBy: "admin",
        createdAt: new Date("2025-05-10"),
        updatedAt: new Date("2025-05-10"),
      },
      {
        id: "3",
        name: "Holiday Campaign",
        description: "Christmas and New Year promotional campaign",
        status: "COMPLETED" as CampaignStatus,
        startDate: new Date("2024-12-01"),
        endDate: new Date("2025-01-15"),
        budget: 75000,
        targetAudience: ["General Public"],
        createdBy: "admin",
        createdAt: new Date("2024-11-15"),
        updatedAt: new Date("2025-01-16"),
      },
    ]
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }
}
