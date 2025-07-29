import { Route } from '@angular/router'
import { authGuard } from '../core/guard/auth/auth.guard'

export const VIEW_ROUTES: Route[] = [
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./dashboards/dashboards.route').then(
        (mod) => mod.DASHBOARD_ROUTES
      ),
  },
  {
    path: 'apps',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./applications/apps.route').then((mod) => mod.APPS_ROUTES),
  },
  {
    path: 'ui',
    canActivate: [authGuard],
    loadChildren: () => import('./ui/ui.route').then((mod) => mod.UI_ROUTES),
  },
  {
    path: 'advanced',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./advance_ui/advance-ui.route').then(
        (mod) => mod.ADVANCED_ROUTES
      ),
  },
  {
    path: 'forms',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./forms/forms.route').then((mod) => mod.FORMS_ROUTES),
  },
  {
    path: 'charts',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./charts/charts.route').then((mod) => mod.CHARTS_ROUTES),
  },

  {
    path: 'tables',
    loadChildren: () =>
      import('./tables/tables.route').then((mod) => mod.TABLES_ROUTES),
  },
  {
    path: 'icons',
    loadChildren: () =>
      import('./icons/icons.route').then((mod) => mod.ICONS_ROUTES),
  },
  {
    path: 'maps',
    loadChildren: () =>
      import('./maps/maps.route').then((mod) => mod.MAPS_ROUTES),
  },
  {
    path: 'email-templates',
    loadChildren: () =>
      import('./email/email.route').then((mod) => mod.EMAIL_ROUTES),
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.route').then((mod) => mod.PAGES_ROUTES),
  },


  //spécific pages
   {
    path: 'users',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./users/users.route').then((mod) => mod.USERS_ROUTES),
  },
]
