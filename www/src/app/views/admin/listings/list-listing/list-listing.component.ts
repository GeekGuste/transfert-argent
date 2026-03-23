import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListingService } from '@/app/core/service/ws/listing/listing.service';
import { Need } from '@/app/common/need.enum';

declare var bootstrap: any;

@Component({
  selector: 'app-list-listing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-listing.component.html',
  styleUrls: ['./list-listing.component.scss']
})
export class ListListingComponent implements OnInit {
  Need = Need;

  listings: any[] = [];
  loading = true;
  actionLoading = false;
  currentListing: any = null;
  error: string | null = null;

  activeTab: 'all' | 'travelers' | 'senders' = 'all';

  get travelers(): any[] {
    return this.listings.filter(l => (l.need?.key ?? l.need) === Need.VOYAGEUR);
  }

  get senders(): any[] {
    return this.listings.filter(l => (l.need?.key ?? l.need) === Need.CHERCHEUR);
  }

  get filteredListings(): any[] {
    if (this.activeTab === 'travelers') return this.travelers;
    if (this.activeTab === 'senders') return this.senders;
    return this.listings;
  }

  constructor(private listingService: ListingService) {}

  ngOnInit(): void {
    this.fetchListings();
  }

  fetchListings(): void {
    this.loading = true;
    this.listingService.getListings().subscribe({
      next: (res: any) => {
        this.listings = res.listings ?? res;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors de la récupération des annonces.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  deactivateListing(listing: any): void {
    this.actionLoading = true;
    this.currentListing = listing;
    this.listingService.deactivateListing(listing).subscribe({
      next: () => this.fetchListings(),
      error: () => { this.actionLoading = false; }
    });
  }

  activateListing(listing: any): void {
    this.actionLoading = true;
    this.currentListing = listing;
    this.listingService.activateListing(listing).subscribe({
      next: () => this.fetchListings(),
      error: () => { this.actionLoading = false; }
    });
  }
}
