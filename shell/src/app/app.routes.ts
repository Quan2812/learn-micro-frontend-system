// shell/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { loadRemote } from '@module-federation/enhanced/runtime';

interface RemoteModule {
  routes: Routes;
}

export const routes: Routes = [
  {
    path: 'campaign',
    loadChildren: () =>
      loadRemote('campaign/routes')
        .then((m: unknown) => {
          const module = m as RemoteModule;
          if (!module.routes) {
            throw new Error('Module campaign/routes does not export "routes"');
          }
          console.log('Loaded campaign module:', module);
          return module.routes;
        })
        .catch((err) => {
          console.error('Error loading campaign/routes:', err);
          throw err;
        }),
  },
  {
    path: 'template',
    loadChildren: () =>
      loadRemote('template/routes')
        .then((m: unknown) => {
          const module = m as RemoteModule;
          if (!module.routes) {
            throw new Error('Module template/routes does not export "routes"');
          }
          console.log('Loaded template module:', module);
          return module.routes;
        })
        .catch((err) => {
          console.error('Error loading template/routes:', err);
          throw err;
        }),
  },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' },
];


// import { Routes } from '@angular/router';
// import { loadRemoteModule } from '@angular-architects/module-federation';

// export const routes: Routes = [
//   {
//     path: 'template',
//     loadChildren: () =>
//       loadRemoteModule({
//         type: 'module',
//         remoteEntry: 'http://localhost:4202/remoteEntry.js',
//         exposedModule: './routes',
//       }).then(m => m.routes),
//   },
//   {
//     path: 'campaign',
//     loadChildren: () =>
//       loadRemoteModule({
//         type: 'module',
//         remoteEntry: 'http://localhost:4201/remoteEntry.js',
//         exposedModule: './routes',
//       }).then(m => m.routes),
//   },
//   { path: '', component: HomeComponent },
//   { path: '**', redirectTo: '' },
//   { path: '', pathMatch: 'full', redirectTo: 'template' },
// ];
