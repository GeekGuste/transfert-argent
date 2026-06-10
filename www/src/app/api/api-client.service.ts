import { Injectable } from '@angular/core';
import { Client } from './webapiservice';
import { environment } from '@/environments/environment';

const PUBLIC_RULES: { urlFragment: string; method: string }[] = [
  { urlFragment: '/users/login', method: 'POST' },
  { urlFragment: '/users/register', method: 'POST' },
  { urlFragment: '/users/verify-email', method: 'POST' },
  { urlFragment: '/users/resend-code', method: 'GET' },
  { urlFragment: '/users/me/reset-password', method: 'GET' },
  { urlFragment: '/users/me/reset-password', method: 'POST' },
  { urlFragment: '/listings', method: 'GET' },
  { urlFragment: '/listings', method: 'POST' },
  { urlFragment: '/listings/access/', method: 'GET' },
  { urlFragment: '/listings/access/', method: 'PUT' },
  { urlFragment: '/listings/access/', method: 'DELETE' },
  { urlFragment: '/listings/access/', method: 'POST' },
  { urlFragment: '/currency', method: 'GET' },
  { urlFragment: '/applications', method: 'POST' },
];

function isPublicRequest(url: string, method: string): boolean {
  return PUBLIC_RULES.some(
    (rule) =>
      url.includes(rule.urlFragment) &&
      method.toUpperCase() === rule.method
  );
}

@Injectable({ providedIn: 'root' })
export class ApiClientService {
  readonly client: Client;

  constructor() {
    this.client = new Client(environment.endpoint, {
      fetch(url: RequestInfo, init?: RequestInit): Promise<Response> {
        const urlStr = typeof url === 'string' ? url : (url as Request).url;
        const method = init?.method ?? 'GET';

        const headersInit = (init?.headers ?? {}) as Record<string, string>;
        const headers: Record<string, string> = { ...headersInit };

        if (!isPublicRequest(urlStr, method)) {
          try {
            const raw = localStorage.getItem('access_token');
            const token = raw ? JSON.parse(raw) : null;
            if (token) {
              headers['Authorization'] = `Bearer ${token}`;
            }
          } catch {
            // no token — request will be rejected by the API if protected
          }
        }

        return window.fetch(url, { ...init, headers });
      },
    });
  }
}
