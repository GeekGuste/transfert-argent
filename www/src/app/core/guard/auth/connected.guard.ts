import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../core/service/ws/auth/auth.service';
import { inject } from '@angular/core';

export const connectedGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isAuthenticated()
  ?inject(Router).createUrlTree(['views/users'])
  :true;
};
