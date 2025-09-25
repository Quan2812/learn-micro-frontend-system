const { ModuleFederationConfig } = require("@module-federation/enhanced")

/**
 * @type {import('@module-federation/enhanced').ModuleFederationConfig}
 */
module.exports = {
  name: "campaign",
  filename: "remoteEntry.js",
  exposes: {
    "./Module": "./src/app/campaign.module.ts",
  },
  shared: {
    "@angular/core": { singleton: true, strictVersion: true, requiredVersion: "^18.2.0" },
    "@angular/common": { singleton: true, strictVersion: true, requiredVersion: "^18.2.0" },
    "@angular/router": { singleton: true, strictVersion: true, requiredVersion: "^18.2.0" },
    "@angular/platform-browser": { singleton: true, strictVersion: true, requiredVersion: "^18.2.0" },
    rxjs: { singleton: true, strictVersion: true, requiredVersion: "~7.8.0" },
  },
}
