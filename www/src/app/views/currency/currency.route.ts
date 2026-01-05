import { Route } from '@angular/router'
import { AddCurrencyComponent } from './add-currency/add-currency.component'
import { ListCurrencyComponent } from './list-currency/list-currency.component'


export const CURRENCY_ROUTES: Route[] = [
    {
    path: '',
    redirectTo:'list',
    pathMatch:'full'
  },
  {
    path: 'add',
    component: AddCurrencyComponent,
    data: { title: 'Add Currency' },
  },
  {
    path: 'list',
    component: ListCurrencyComponent,
    data: { title: 'Currency List' },
  },

    {
    path: '**',
    redirectTo:'list',
    pathMatch:'full'
  },

]
