import { RedirectCommand, Router, Routes, UrlTree } from '@angular/router'
import { LayoutComponent } from './layouts/layout/layout.component'
import { Error404Component } from './views/auth/error404/error404.component'
import { Error500Component } from './views/auth/error500/error500.component'
import { MaintenanceComponent } from './views/auth/maintenance/maintenance.component'
import { inject } from '@angular/core'
import { AuthenticationService } from './core/service/auth.service'
import { authGuard } from './core/guard/auth/auth.guard'
import { connectedGuard } from './core/guard/auth/connected.guard'

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'maintenance',
    pathMatch: 'full',
  },
   {
    path: 'home',
    loadChildren: () =>
      import('./views/pages/pages.route').then((mod) => mod.PAGES_ROUTES),
  },
  // {
  //   path: '',
  //   component: LayoutComponent,
  //   canActivate: [authGuard],
  //   loadChildren: () =>
  //     import('./views/views.route').then((mod) => mod.VIEW_ROUTES),
  // },
  {
    path: 'auth',
    loadChildren: () =>
      import('./views/auth/auth.route').then((mod) => mod.AUTH_ROUTES),
  },
    {
    path: 'maintenance',
    component: MaintenanceComponent,
    data: { title: 'Maintenance' },
  },

  {
    path: '**',
    component: Error404Component,
    data: { title: '404 - Error' },
    pathMatch:"full"
  },
  // {
  //   path: 'error-500',
  //   component: Error500Component,
  //   data: { title: '500 - Error' },
  // },

]
