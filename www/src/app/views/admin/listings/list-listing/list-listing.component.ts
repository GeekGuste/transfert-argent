import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListingService } from '@/app/core/service/ws/listing/listing.service';
import { ListingDto, NeedEnumDto } from '@/app/api/webapiservice';

@Component({
  selector: 'app-list-listing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-listing.component.html',
  styleUrls: ['./list-listing.component.scss'],
})
export class ListListingComponent implements OnInit {
  NeedEnumDto = NeedEnumDto;

  listings: ListingDto[] = [];
  loading = true;
  actionLoading = false;
  currentListingId: string | null = null;
  error: string | null = null;

  activeTab: 'all' | 'travelers' | 'senders' = 'all';

  get travelers(): ListingDto[] {
    return this.listings.filter((l) => l.need?.key === NeedEnumDto.Traveler);
  }

  get senders(): ListingDto[] {
    return this.listings.filter((l) => l.need?.key === NeedEnumDto.Sender);
  }

  get filteredListings(): ListingDto[] {
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
      next: (res) => {
        this.listings = res.listings ?? [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur lors de la récupération des annonces.';
        this.loading = false;
      },
    });
  }

  deleteListing(listing: ListingDto): void {
    if (!listing.id || this.actionLoading) return;
    this.actionLoading = true;
    this.currentListingId = listing.id;

    this.listingService.deleteListing(listing.id).subscribe({
      next: () => {
        this.listings = this.listings.filter((l) => l.id !== listing.id);
        this.actionLoading = false;
        this.currentListingId = null;
      },
      error: () => {
        this.actionLoading = false;
        this.currentListingId = null;
      },
    });
  }

  pricePerKg(listing: ListingDto): number {
    return (listing.pricePerGram ?? 0) * 1000;
  }
}
