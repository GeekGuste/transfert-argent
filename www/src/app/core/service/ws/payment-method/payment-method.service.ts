import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ApiClientService } from '@/app/api/api-client.service';
import { PaymentMethodDto } from '@/app/api/webapiservice';

@Injectable({ providedIn: 'root' })
export class PaymentMethodService {
  constructor(private api: ApiClientService) {}

  getPaymentMethods(): Observable<PaymentMethodDto[]> {
    return from(this.api.client.getPaymentMethods());
  }
}
