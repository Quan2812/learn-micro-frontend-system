const ModuleFederationPlugin = require("@angular-architects/module-federation/webpack")

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      remotes: {
        campaign: "http://localhost:4201/remoteEntry.js",
        template: "http://localhost:4202/remoteEntry.js",
      },
      shared: {
        "@angular/core": { singleton: true, strictVersion: true, requiredVersion: "^18.2.0" },
        "@angular/common": { singleton: true, strictVersion: true, requiredVersion: "^18.2.0" },
        "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: "^18.2.0" },
        "@angular/router": { singleton: true, strictVersion: true, requiredVersion: "^18.2.0" },
        "@angular/forms": { singleton: true, strictVersion: true, requiredVersion: "^18.2.0" },
        rxjs: { singleton: true, strictVersion: true, requiredVersion: "^7.8.0" },
      },
    }),
  ],
}
