const ModuleFederationPlugin = require("@angular-architects/module-federation/webpack")

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "shared",
      filename: "remoteEntry.js",
      exposes: {
        "./Models": "./src/index.ts",
      },
      shared: {
        "@angular/core": { singleton: true, strictVersion: true, requiredVersion: "^18.2.0" },
        "@angular/common": { singleton: true, strictVersion: true, requiredVersion: "^18.2.0" },
        rxjs: { singleton: true, strictVersion: true, requiredVersion: "^7.8.0" },
      },
    }),
  ],
}
