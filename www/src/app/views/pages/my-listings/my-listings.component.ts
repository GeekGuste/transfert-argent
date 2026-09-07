import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListingService } from '@/app/core/service/ws/listing/listing.service';
import { GlobalErrorService } from '@/app/core/service/global-error.service';
import { ListingDto, NeedEnumDto } from '@/app/api/webapiservice';
import { FrontI18nPipe } from '@/app/shared/pipes/front-i18n.pipe';

@Component({
  selector: 'app-my-listings',
  standalone: true,
  imports: [CommonModule, RouterModule, FrontI18nPipe],
  templateUrl: './my-listings.component.html',
  styleUrl: './my-listings.component.scss',
})
export class MyListingsComponent implements OnInit {
  NeedEnumDto = NeedEnumDto;

  listings: ListingDto[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private listingService: ListingService,
    private errorService: GlobalErrorService
  ) {}

  ngOnInit(): void {
    this.loadListings();
  }

  loadListings(): void {
    this.loading = true;
    this.error = null;
    this.listingService.getMyListings().subscribe({
      next: (res) => {
        this.listings = res.listings ?? [];
        this.loading = false;
      },
      error: (err) => {
        this.errorService.handleHttpError(err);
        this.error = 'Impossible de récupérer vos annonces.';
        this.loading = false;
      },
    });
  }

  weightKg(listing: ListingDto): number {
    return ((listing.availableWeightInGrams ?? listing.desiredWeightInGrams ?? 0)) / 1000;
  }

  listingDate(listing: ListingDto): Date | undefined {
    return listing.departureDate ?? listing.maxTravelDate ?? listing.arrivalDate;
  }
}
