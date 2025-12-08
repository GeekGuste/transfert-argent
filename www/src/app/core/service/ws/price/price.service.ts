import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PriceService {
  endpoint = environment.endpoint;

  constructor(
    private httpClient: HttpClient
  ) { }

  getPrices() {
    return this.httpClient.get(this.endpoint + '/subscriptions');
  }

  getPrice(service: any) {
    return this.httpClient.get(this.endpoint + '/subscriptions/' + service.key);
  }

  createPrice(serviceForm: any) {
    return this.httpClient.post(this.endpoint + '/subscriptions', serviceForm);
  }

  updatePrice(service: any) {
    console.log(service);
    return this.httpClient.put(this.endpoint + '/subscriptions/' + service.id, service);
  }

  deletePrice(service: any) {
    return this.httpClient.delete(this.endpoint + '/subscriptions/delete', service);
  }

  deactivatePrice(service: any) {
    service.isEnabled = false;
    return this.httpClient.put(this.endpoint + '/prices/' + service.id, service);
  }

  activatePrice(service: any) {
    service.isEnabled = true;
    return this.httpClient.put(this.endpoint + '/prices/' + service.id, service);
  }

  getFrequencies() {
    return this.httpClient.get(this.endpoint + '/subscriptions/frequencies');
  }
}
