import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ApiClientService } from '@/app/api/api-client.service';
import { CountryDto, GetCountriesOutput } from '@/app/api/webapiservice';

@Injectable({ providedIn: 'root' })
export class CountryService {
  constructor(private api: ApiClientService) {}

  getCountries(): Observable<GetCountriesOutput> {
    return from(this.api.client.getCountries());
  }

  getActiveCountries(): Observable<GetCountriesOutput> {
    return from(this.api.client.getActiveCountries());
  }

  createCountry(body: CountryDto): Observable<void> {
    return from(this.api.client.createCountry(body));
  }

  updateCountry(id: string, body: CountryDto): Observable<void> {
    return from(this.api.client.updateCountry(id, body));
  }
}
