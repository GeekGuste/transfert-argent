import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Listing } from '@/app/core/models/listing.model';


@Injectable({
  providedIn: 'root'
})
export class ListingService {
  endpoint = environment.endpoint;

  constructor(
    private httpClient: HttpClient
  ) { }

  getListings() {
    return this.httpClient.get(this.endpoint + '/listings');
  }

  getListing(listing: Listing) {
    return this.httpClient.get(this.endpoint + '/listings/' + listing.id);
  }

  createListing(ListingForm: any) {
    return this.httpClient.post(this.endpoint + '/listings', ListingForm);
  }

  updateListing(Listing: any) {
    console.log(Listing);
    return this.httpClient.put(this.endpoint + '/listings/' + Listing.id, Listing);
  }

  deleteListing(Listing: any) {
    return this.httpClient.delete(this.endpoint + '/listings/delete', Listing);
  }

  deactivateListing(Listing: any) {
    Listing.isEnabled = false;
    return this.httpClient.put(this.endpoint + '/listings/' + Listing.id, Listing);
  }

  activateListing(Listing: any) {
    Listing.isEnabled = true;
    return this.httpClient.put(this.endpoint + '/listings/' + Listing.id, Listing);
  }

}
