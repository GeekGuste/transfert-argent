import { Route } from '@angular/router'
import { AddCountryComponent } from './add-country/add-country.component'
import { ListCountryComponent } from './list-country/list-country.component'


export const COUNTRIES_ROUTES: Route[] = [
    {
    path: '',
    redirectTo:'list',
    pathMatch:'full'
  },
  {
    path: 'add',
    component: AddCountryComponent,
    data: { title: 'add user' },
  },
  {
    path: 'list',
    component: ListCountryComponent,
    data: { title: 'Country List' },
  },

    {
    path: '**',
    redirectTo:'list',
    pathMatch:'full'
  },

]
