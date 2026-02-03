import { environment } from '@/environments/environment';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  function isRouteInArray(array: any[], url: any, method: any) {
    return array.some(item => item.url === url && item.method === method);
  }
  const endpoint = environment.endpoint;
  const urlsToNotUse = [
    { url: endpoint + '/users/login', method: 'POST' },
    { url: endpoint + '/users/register', method: 'POST' },
    { url: endpoint + '/forgot-password', method: 'POST' },
    { url: endpoint + '/reset-password', method: 'PUT' },
    { url: endpoint + '/users/verify-email', method: 'POST' },
    { url: endpoint + '/users/resend-code', method: 'GET' },
    { url: endpoint + '/users/me/reset-password', method: 'GET' },
    { url: endpoint + '/users/me/reset-password', method: 'POST' },
    { url: endpoint + '/listings', method: 'POST' },
  ];
  console.log(req.url);
  console.log(isRouteInArray(urlsToNotUse, req.url, req.method));
  console.log(urlsToNotUse, req.url);
  if (isRouteInArray(urlsToNotUse, req.url, req.method)) {
  } else {
    req = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + JSON.parse(localStorage.getItem('access_token') || '')
      ),
    });
  }
  return next(req);
};
