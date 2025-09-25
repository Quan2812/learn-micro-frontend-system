import type { Routes } from "@angular/router"
import { HomeComponent } from "./home/home.component"
import { loadRemote } from "@module-federation/enhanced/runtime"
import { MicroFrontendGuard } from "./guards/micro-frontend.guard"

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "campaign",
    canActivate: [MicroFrontendGuard],
    loadChildren: () => loadRemote<any>("campaign/Module").then((m: any) => m.CampaignModule),
  },
  {
    path: "template",
    canActivate: [MicroFrontendGuard],
    loadChildren: () => loadRemote<any>("template/Module").then((m: any) => m.TemplateModule),
  },
  {
    path: "**",
    redirectTo: "",
  },
]
