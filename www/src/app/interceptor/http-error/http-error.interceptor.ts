import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { GlobalErrorService } from '@/app/core/service/global-error.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(GlobalErrorService);
  return next(req).pipe(
    catchError((err) => {
      errorService.handleHttpError(err);
      return throwError(() => err);
    })
  );
};
