import { Route } from '@angular/router';
import { authGuard } from '../core/guard/auth/auth.guard';

export const VIEW_ROUTES: Route[] = [
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
  {
    path: 'country',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./country/country.route').then((mod) => mod.COUNTRIES_ROUTES),
  },
  {
    path: 'service',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./service/service.route').then((mod) => mod.SERVICES_ROUTES),
  },

  {
    path: 'price',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./price/price.route').then((mod) => mod.PRICES_ROUTES),
  },
  {
    path: 'currency',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./currency/currency.route').then((mod) => mod.CURRENCY_ROUTES),
  },
    {
      path: '**',
      redirectTo: 'dashboard',
      pathMatch: "full"
    },
];
