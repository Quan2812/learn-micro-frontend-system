// // campaign/src/app/app.routes.ts
// import type { Routes } from '@angular/router';
// import { CampaignListComponent } from './campaign-list/campaign-list.component';
// import { CampaignDetailComponent } from './campaign-detail/campaign-detail.component';
// import { CreateCampaignComponent } from './create-campaign/create-campaign.component';

// export const routes: Routes = [
//   { path: '', component: CampaignListComponent },
//   { path: 'create', component: CreateCampaignComponent },
//   { path: 'detail/:id', component: CampaignDetailComponent },
//   { path: '**', redirectTo: '' },
// ];



import type { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./campaign-list/campaign-list.component').then(m => m.CampaignListComponent) },
  { path: 'create', loadComponent: () => import('./create-campaign/create-campaign.component').then(m => m.CreateCampaignComponent) },
  { path: 'detail/:id', loadComponent: () => import('./campaign-detail/campaign-detail.component').then(m => m.CampaignDetailComponent) },
  { path: '**', redirectTo: '' },
];
