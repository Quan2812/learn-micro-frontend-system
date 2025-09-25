import type { Routes } from "@angular/router"
import { CampaignListComponent } from "./campaign-list/campaign-list.component"
import { CampaignDetailComponent } from "./campaign-detail/campaign-detail.component"
import { CreateCampaignComponent } from "./create-campaign/create-campaign.component"

export const routes: Routes = [
  {
    path: "",
    component: CampaignListComponent,
  },
  {
    path: "create",
    component: CreateCampaignComponent,
  },
  {
    path: "detail/:id",
    component: CampaignDetailComponent,
  },
  {
    path: "**",
    redirectTo: "",
  },
]
