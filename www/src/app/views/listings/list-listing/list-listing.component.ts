import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListingService } from '@/app/core/service/ws/listing/listing.service';
import { CountryService } from '@/app/core/service/ws/country/country.service';
import { CountryDto, ListingDto, NeedEnumDto } from '@/app/api/webapiservice';
import { NavbarComponent } from '@/app/shared/navbar/navbar.component';
import { TrlPipe } from '@alrevele/translator';

@Component({
  selector: 'app-list-listing',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent, TrlPipe],
  templateUrl: './list-listing.component.html',
  styleUrls: ['./list-listing.component.scss'],
})
export class ListListingComponent implements OnInit {
  NeedEnumDto = NeedEnumDto;

  listings: ListingDto[] = [];
  countries: CountryDto[] = [];
  loading = true;
  error: string | null = null;
  viewMode: 'grid' | 'list' = 'grid';

  filterDepartureCountryId = '';
  filterDepartureCity = '';
  filterArrivalCountryId = '';
  filterArrivalCity = '';
  filterNeed: NeedEnumDto | '' = '';
  filterDateFrom = '';
  filterDateTo = '';

  constructor(
    private listingService: ListingService,
    private countryService: CountryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.countryService.getActiveCountries().subscribe({
      next: (res) => { this.countries = res.countries ?? []; },
    });
    this.route.queryParams.subscribe(params => {
      this.filterDepartureCountryId = params['departureCountryId'] ?? '';
      this.filterDepartureCity = params['departureCity'] ?? '';
      this.filterArrivalCountryId = params['arrivalCountryId'] ?? '';
      this.filterArrivalCity = params['arrivalCity'] ?? '';
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
      this.filterDepartureCountryId || undefined,
      this.filterDepartureCity || undefined,
      this.filterArrivalCountryId || undefined,
      this.filterArrivalCity || undefined,
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
    this.filterDepartureCountryId = '';
    this.filterDepartureCity = '';
    this.filterArrivalCountryId = '';
    this.filterArrivalCity = '';
    this.filterNeed = '';
    this.filterDateFrom = '';
    this.filterDateTo = '';
    this.fetchListings();
  }

  get hasActiveFilters(): boolean {
    return !!(this.filterDepartureCountryId || this.filterDepartureCity || this.filterArrivalCountryId || this.filterArrivalCity || this.filterNeed || this.filterDateFrom || this.filterDateTo);
  }

  pricePerKg(listing: ListingDto): number {
    return listing.pricePerKg ?? 0;
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
