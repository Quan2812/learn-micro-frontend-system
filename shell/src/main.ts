import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { init } from '@module-federation/enhanced/runtime';

try {
  init({
    name: 'shell',
    remotes: [
      { name: 'campaign', alias: 'campaign', entry: 'http://localhost:4201/remoteEntry.js', type: 'module' },
      { name: 'template', alias: 'template', entry: 'http://localhost:4202/remoteEntry.js', type: 'module' },
    ],
    shared: {
      '@angular/core': { version: '^18.2.0' },
      '@angular/common': { version: '^18.2.0' },
      '@angular/router': { version: '^18.2.0' },
      'rxjs': { version: '~7.8.0' },
    },
  });
} catch (err) {
  console.error('Error initializing Module Federation:', err);
}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), importProvidersFrom(BrowserAnimationsModule)],
}).catch(err => console.error('Error bootstrapping application:', err));