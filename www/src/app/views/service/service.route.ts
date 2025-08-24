import { Route } from '@angular/router'
import { AddServiceComponent } from './add-service/add-service.component'
import { ListServiceComponent } from './list-service/list-service.component'


export const SERVICES_ROUTES: Route[] = [
    {
    path: '',
    redirectTo:'list',
    pathMatch:'full'
  },
  {
    path: 'add',
    component: AddServiceComponent,
    data: { title: 'add service' },
  },
  {
    path: 'list',
    component: ListServiceComponent,
    data: { title: 'Service List' },
  },

    {
    path: '**',
    redirectTo:'list',
    pathMatch:'full'
  },

]
