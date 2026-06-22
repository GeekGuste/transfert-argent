import { Routes } from '@angular/router'
import { LayoutComponent } from './layouts/layout/layout.component'
import { Error404Component } from './views/auth/error404/error404.component'
import { MaintenanceComponent } from './views/auth/maintenance/maintenance.component'
import { authGuard } from './core/guard/auth/auth.guard'
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component'
import { AddListingComponent } from './views/listings/add-listing/add-listing.component'
import { ListListingComponent } from './views/listings/list-listing/list-listing.component'
import { ListingDetailsComponent } from './views/listings/listing-details/listing-details.component'
import { ManageListingComponent } from './views/listings/manage-listing/manage-listing.component'

export const routes: Routes = [
  {
    path: 'forms',
    component: AddListingComponent,
  },
  {
    path: 'forms/list',
    component: ListListingComponent,
  },
  {
    path: 'forms/:id/details',
    component: ListingDetailsComponent,
  },
  {
    path: 'listings/manage/:token',
    component: ManageListingComponent,
  },
  {
    path: 'views',
    component: LayoutComponent,
    canActivate: [authGuard],
    loadChildren: () =>
      import('./views/views.route').then((mod) => mod.VIEW_ROUTES),
  },
  {
    path: 'maintenance',
    component: MaintenanceComponent,
    data: { title: 'Maintenance' },
  },
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./views/pages/pages.route').then((mod) => mod.PAGES_ROUTES),
  },
  {
    path: '**',
    component: Error404Component,
    data: { title: '404 - Error' },
    pathMatch: 'full',
  },
]
