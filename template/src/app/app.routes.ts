import type { Routes } from "@angular/router"
import { TemplateListComponent } from "./template-list/template-list.component"
import { TemplateDetailComponent } from "./template-detail/template-detail.component"
import { CreateTemplateComponent } from "./create-template/create-template.component"
import { TemplateEditorComponent } from "./template-editor/template-editor.component"

export const routes: Routes = [
  {
    path: "",
    component: TemplateListComponent,
  },
  {
    path: "create",
    component: CreateTemplateComponent,
  },
  {
    path: "detail/:id",
    component: TemplateDetailComponent,
  },
  {
    path: "editor/:id",
    component: TemplateEditorComponent,
  },
  {
    path: "**",
    redirectTo: "",
  },
]
