import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ApiClientService } from '@/app/api/api-client.service';
import {
  ApplicationInput,
  GetApplicationsOutput,
  GetListingsOutput,
  ListingDto,
  ListingInput,
  NeedEnumDto,
  UpdateListingInput,
} from '@/app/api/webapiservice';

@Injectable({ providedIn: 'root' })
export class ListingService {
  constructor(private api: ApiClientService) {}

  getListings(
    departureCountryId?: string,
    departureCity?: string,
    arrivalCountryId?: string,
    arrivalCity?: string,
    need?: NeedEnumDto,
    dateFrom?: Date,
    dateTo?: Date
  ): Observable<GetListingsOutput> {
    return from(this.api.client.getListings(departureCountryId, departureCity, arrivalCountryId, arrivalCity, need, dateFrom, dateTo));
  }

  getListingById(id: string): Observable<ListingDto> {
    return from(this.api.client.getListingById(id));
  }

  getListingByToken(token: string): Observable<ListingDto> {
    return from(this.api.client.getListingByToken(token));
  }

  createListing(input: ListingInput): Observable<ListingDto> {
    return from(this.api.client.createListing(input));
  }

  updateListingByToken(token: string, input: UpdateListingInput): Observable<ListingDto> {
    return from(this.api.client.updateListingByToken(token, input));
  }

  deactivateListing(token: string): Observable<void> {
    return from(this.api.client.deactivateListing(token));
  }

  deleteListing(listingId: string): Observable<void> {
    return from(this.api.client.deleteListing(listingId));
  }

  confirmListingActive(token: string): Observable<void> {
    return from(this.api.client.confirmListingActive(token));
  }

  validateApplication(token: string, applicationId: string): Observable<void> {
    return from(this.api.client.validateApplication(token, applicationId));
  }

  createApplication(input: ApplicationInput): Observable<void> {
    return from(this.api.client.createApplication(input));
  }

  getApplications(): Observable<GetApplicationsOutput> {
    return from(this.api.client.getApplications());
  }
}
