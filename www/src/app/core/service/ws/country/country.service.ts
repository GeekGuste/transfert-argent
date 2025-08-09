import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CountryService {
  endpoint = environment.endpoint;

  constructor(
    private httpClient: HttpClient
  ) { }

  getCountries(){
      return this.httpClient.get(this.endpoint+'/countries');
  }

  getCountry(country:any){
    return this.httpClient.get(this.endpoint+'/countries/'+country.key);
}

  createCountry(countryForm:any){
    return this.httpClient.post(this.endpoint+'/countries',countryForm);
  }

  updateCountry(country:any){
    console.log(country);
    return this.httpClient.put(this.endpoint+'/countries/'+country.id,country);
  }

  deleteCountry(country:any){
    return this.httpClient.delete(this.endpoint+'/countries/delete',country);
  }

   deactivateCountry(country:any){
    country.isEnabled = false;
    return this.httpClient.put(this.endpoint+'/countries/' + country.id ,country);
  }

   activateCountry(country:any){
        country.isEnabled = true;
    return this.httpClient.put(this.endpoint+'/countries/' + country.id ,country);
  }
}
