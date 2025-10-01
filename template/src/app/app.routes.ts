// import type { Routes } from "@angular/router"
// import { TemplateListComponent } from "./template-list/template-list.component"
// import { TemplateDetailComponent } from "./template-detail/template-detail.component"
// import { CreateTemplateComponent } from "./create-template/create-template.component"
// import { TemplateEditorComponent } from "./template-editor/template-editor.component"

// export const routes: Routes = [
//   {
//     path: "",
//     component: TemplateListComponent,
//   },
//   {
//     path: "create",
//     component: CreateTemplateComponent,
//   },
//   {
//     path: "detail/:id",
//     component: TemplateDetailComponent,
//   },
//   {
//     path: "editor/:id",
//     component: TemplateEditorComponent,
//   },
//   {
//     path: "**",
//     redirectTo: "",
//   },
// ]


import type { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./template-list/template-list.component').then(m => m.TemplateListComponent) },
  { path: 'create', loadComponent: () => import('./create-template/create-template.component').then(m => m.CreateTemplateComponent) },
  { path: 'detail/:id', loadComponent: () => import('./template-detail/template-detail.component').then(m => m.TemplateDetailComponent) },
  { path: 'editor/:id', loadComponent: () => import('./template-editor/template-editor.component').then(m => m.TemplateEditorComponent) },
  { path: '**', redirectTo: '' },
];
