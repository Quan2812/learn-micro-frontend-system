import { Injectable } from "@angular/core"
import { loadRemoteModule } from "@angular-architects/module-federation"

@Injectable({
  providedIn: "root",
})
export class RemoteLoaderService {
  async loadCampaignModule() {
    try {
      const module = await loadRemoteModule({
        type: "module",
        remoteEntry: "http://localhost:4201/remoteEntry.js",
        exposedModule: "./Module",
      })
      return module.CampaignModule
    } catch (error) {
      console.error("Error loading campaign module:", error)
      throw error
    }
  }

  async loadTemplateModule() {
    try {
      const module = await loadRemoteModule({
        type: "module",
        remoteEntry: "http://localhost:4202/remoteEntry.js",
        exposedModule: "./Module",
      })
      return module.TemplateModule
    } catch (error) {
      console.error("Error loading template module:", error)
      throw error
    }
  }
}
