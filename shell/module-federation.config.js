const { ModuleFederationConfig } = require("@module-federation/enhanced")

/**
 * @type {import('@module-federation/enhanced').ModuleFederationConfig}
 */
module.exports = {
  name: "shell",
  remotes: {
    campaign: "campaign@http://localhost:4201/remoteEntry.js",
    template: "template@http://localhost:4202/remoteEntry.js",
  },
  shared: {
    "@angular/core": { singleton: true, strictVersion: true, requiredVersion: "^18.2.0" },
    "@angular/common": { singleton: true, strictVersion: true, requiredVersion: "^18.2.0" },
    "@angular/router": { singleton: true, strictVersion: true, requiredVersion: "^18.2.0" },
    "@angular/platform-browser": { singleton: true, strictVersion: true, requiredVersion: "^18.2.0" },
    rxjs: { singleton: true, strictVersion: true, requiredVersion: "~7.8.0" },
  },
}
