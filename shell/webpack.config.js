// shell/webpack.config.js
const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const mf = withModuleFederationPlugin({
  name: 'shell',
  remotes: {
    campaign: 'campaign@http://localhost:4201/remoteEntry.js',
    template: 'template@http://localhost:4202/remoteEntry.js',
  },
  shared: {
    '@angular/core':   { singleton: true, strictVersion: true, requiredVersion: '^18.2.0' },
    '@angular/common': { singleton: true, strictVersion: true, requiredVersion: '^18.2.0' },
    '@angular/router': { singleton: true, strictVersion: true, requiredVersion: '^18.2.0' },
    rxjs:              { singleton: true, strictVersion: true, requiredVersion: '^7.8.0' },
  },
});

// ⚠️ Chèn các cấu hình webpack top-level Ở NGOÀI options của MF:
module.exports = (config) => {
  const merged = mf(config);

  // Bật ESM output để trình duyệt hiểu import.meta
  merged.experiments = { ...(merged.experiments || {}), outputModule: true };
  merged.output = { ...(merged.output || {}), module: true, scriptType: 'module' };
  // Target hợp lý cho Angular 18
  merged.target = ['web', 'es2020'];

  // (Tuỳ chọn) vá loader CSS để tránh phát sinh import.meta.url trong styles
  // → giúp xử lý nếu bạn vẫn còn lỗi import.meta ở styles.js
  if (merged.module && Array.isArray(merged.module.rules)) {
    merged.module.rules = merged.module.rules.map((rule) => {
      if (rule && Array.isArray(rule.use)) {
        rule.use = rule.use.map((u) => {
          if (u && (u.loader || '').includes('css-loader')) {
            return {
              ...u,
              options: { ...(u.options || {}), esModule: false }, // NGĂN import.meta.url từ css-loader
            };
          }
          return u;
        });
      }
      return rule;
    });
  }

  return merged;
};
