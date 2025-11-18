import { Route } from '@angular/router'
import { LockScreenComponent } from './lock-screen/lock-screen.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { RecoverPwComponent } from './recover-pw/recover-pw.component'
import { connectedGuard } from '@/app/core/guard/auth/connected.guard'
import { VerifyComponent } from './verify/verify.component'

export const AUTH_ROUTES: Route[] = [
  {
    path: 'log-in',
    canActivate:[connectedGuard],
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' },
  },
  {
    path: 'reset-pass',
    component: RecoverPwComponent,
    data: { title: 'Recover Password' },
  },
  {
    path: 'lock-screen',
    component: LockScreenComponent,
    data: { title: 'Lock Screen' },
  },
   {
    path: 'verify-email',
    component: VerifyComponent,
    data: { title: 'verify email' },
  },
]
