import { Route } from '@angular/router'
import { AddPriceComponent } from './add-price/add-price.component'
import { ListPriceComponent } from './list-price/list-price.component'


export const PRICES_ROUTES: Route[] = [
    {
    path: '',
    redirectTo:'list',
    pathMatch:'full'
  },
  {
    path: 'add',
    component: AddPriceComponent,
    data: { title: 'add service' },
  },
  {
    path: 'list',
    component: ListPriceComponent,
    data: { title: 'price List' },
  },

    {
    path: '**',
    redirectTo:'list',
    pathMatch:'full'
  },

]
