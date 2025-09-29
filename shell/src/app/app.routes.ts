import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component"
import { loadRemote } from '@module-federation/enhanced/runtime';

export const routes: Routes = [
  {
    path: 'campaign',
    loadChildren: () =>
      loadRemote('campaign/routes').then((m: any) => m.routes), // nếu remote expose routes
    // hoặc: loadRemote('campaign/Module').then((m:any)=> m.CampaignModule)
  },
  {
    path: 'template',
    loadChildren: () =>
      loadRemote('template/routes').then((m: any) => m.routes),
  },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' },
];
