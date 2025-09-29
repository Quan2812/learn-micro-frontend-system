import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { init } from '@module-federation/enhanced/runtime';

(async () => {
  await init({
    name: 'shell',
    remotes: [
      // 👇 khai báo kiểu module ESM (không cần globalName)
      { name: 'campaign', entry: 'http://localhost:4201/remoteEntry.mjs', type: 'module' },
      { name: 'template', entry: 'http://localhost:4202/remoteEntry.mjs', type: 'module' },
    ],
  });

  await bootstrapApplication(AppComponent, {
    providers: [provideRouter(routes), importProvidersFrom(BrowserAnimationsModule)],
  });
})();
