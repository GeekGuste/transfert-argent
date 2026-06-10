import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ApiClientService } from '@/app/api/api-client.service';
import { CurrencyDto, CurrencyOutput } from '@/app/api/webapiservice';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  constructor(private api: ApiClientService) {}

  getCurrencies(): Observable<CurrencyOutput> {
    return from(this.api.client.getCurrencies());
  }

  createCurrency(body: CurrencyDto): Observable<void> {
    return from(this.api.client.createCurrency(body));
  }

  updateCurrency(currencyId: string, body: CurrencyDto): Observable<void> {
    return from(this.api.client.updateCurrency(currencyId, body));
  }

  deleteCurrency(currencyId: string): Observable<void> {
    return from(this.api.client.deleteCurrency(currencyId));
  }
}
