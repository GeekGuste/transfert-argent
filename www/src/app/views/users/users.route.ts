import { Route } from '@angular/router'
import { AddUserComponent } from './add-user/add-user.component'
import { ListUserComponent } from './list-user/list-user.component'


export const USERS_ROUTES: Route[] = [
    {
    path: '',
    redirectTo:'list',
    pathMatch:'full'
  },
  {
    path: 'add',
    component: AddUserComponent,
    data: { title: 'add user' },
  },
  {
    path: 'list',
    component: ListUserComponent,
    data: { title: 'User List' },
  },

    {
    path: '**',
    redirectTo:'list',
    pathMatch:'full'
  },

]
