import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  endpoint = environment.endpoint;

  constructor(
    private httpClient: HttpClient
  ) { }

  getCurrencies(){
      return this.httpClient.get(this.endpoint+'/currency');
  }

  getCurrency(currency:any){
    return this.httpClient.get(this.endpoint+'/currency/'+currency.key);
}

  createCurrency(currencyForm:any){
    return this.httpClient.post(this.endpoint+'/currency',currencyForm);
  }

  updateCurrency(currency:any){
    console.log(currency);
    return this.httpClient.put(this.endpoint+'/currency/'+currency.id,currency);
  }

  deleteCurrency(currency:any){
    return this.httpClient.delete(this.endpoint+'/currency/delete',currency);
  }

   deactivateCurrency(currency:any){
    currency.isEnabled = false;
    return this.httpClient.put(this.endpoint+'/currency/' + currency.id ,currency);
  }

   activateCurrency(currency:any){
        currency.isEnabled = true;
    return this.httpClient.put(this.endpoint+'/currency/' + currency.id ,currency);
  }
}
