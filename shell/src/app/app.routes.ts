import type { Routes } from "@angular/router"
import { HomeComponent } from "./home/home.component"
import { loadRemoteModule } from "@module-federation/enhanced/runtime"
import { MicroFrontendGuard } from "./guards/micro-frontend.guard"

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "campaign",
    canActivate: [MicroFrontendGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: "module",
        remoteName: "campaign",
        exposedModule: "./Module",
      }).then((m) => m.CampaignModule),
  },
  {
    path: "template",
    canActivate: [MicroFrontendGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: "module",
        remoteName: "template",
        exposedModule: "./Module",
      }).then((m) => m.TemplateModule),
  },
  {
    path: "**",
    redirectTo: "",
  },
]
