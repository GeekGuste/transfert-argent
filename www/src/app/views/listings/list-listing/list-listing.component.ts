import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListingService } from '@/app/core/service/ws/listing/listing.service';
import { ListingDto, NeedEnumDto } from '@/app/api/webapiservice';
import { NavbarComponent } from '@/app/shared/navbar/navbar.component';

@Component({
  selector: 'app-list-listing',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './list-listing.component.html',
  styleUrls: ['./list-listing.component.scss'],
})
export class ListListingComponent implements OnInit {
  NeedEnumDto = NeedEnumDto;

  listings: ListingDto[] = [];
  loading = true;
  error: string | null = null;
  viewMode: 'grid' | 'list' = 'grid';

  filterDeparture = '';
  filterArrival = '';
  filterNeed: NeedEnumDto | '' = '';
  filterDateFrom = '';
  filterDateTo = '';

  constructor(
    private listingService: ListingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filterDeparture = params['departure'] ?? '';
      this.filterArrival = params['arrival'] ?? '';
      this.filterNeed = params['need'] ?? '';
      this.fetchListings();
    });
  }

  fetchListings(): void {
    this.loading = true;
    this.error = null;
    const need = this.filterNeed ? this.filterNeed as NeedEnumDto : undefined;
    const dateFrom = this.filterDateFrom ? new Date(this.filterDateFrom) : undefined;
    const dateTo = this.filterDateTo ? new Date(this.filterDateTo) : undefined;

    this.listingService.getListings(
      this.filterDeparture || undefined,
      this.filterArrival || undefined,
      need,
      dateFrom,
      dateTo
    ).subscribe({
      next: (res) => {
        this.listings = (res.listings ?? []).filter(l => l.isActive !== false);
        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur lors de la récupération des annonces.';
        this.loading = false;
      },
    });
  }

  resetFilters(): void {
    this.filterDeparture = '';
    this.filterArrival = '';
    this.filterNeed = '';
    this.filterDateFrom = '';
    this.filterDateTo = '';
    this.fetchListings();
  }

  get hasActiveFilters(): boolean {
    return !!(this.filterDeparture || this.filterArrival || this.filterNeed || this.filterDateFrom || this.filterDateTo);
  }

  pricePerKg(listing: ListingDto): number {
    return (listing.pricePerGram ?? 0) * 1000;
  }

  weightKg(grams: number | null | undefined): number {
    return (grams ?? 0) / 1000;
  }

  listingDate(listing: ListingDto): Date | undefined {
    return listing.departureDate ?? listing.maxTravelDate ?? listing.arrivalDate;
  }

  initials(listing: ListingDto): string {
    return `${listing.firstName?.charAt(0) ?? ''}${listing.lastName?.charAt(0) ?? ''}`.toUpperCase();
  }
}
