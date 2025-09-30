// campaign/webpack.config.js
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'campaign',
  filename: 'remoteEntry.js',
  exposes: {
    './routes': './src/app/app.routes.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    '@angular/core': { singleton: true, strictVersion: true, requiredVersion: '^18.2.0' },
    '@angular/common': { singleton: true, strictVersion: true, requiredVersion: '^18.2.0' },
    '@angular/router': { singleton: true, strictVersion: true, requiredVersion: '^18.2.0' },
    'rxjs': { singleton: true, strictVersion: true, requiredVersion: '~7.8.0' },
  },
});