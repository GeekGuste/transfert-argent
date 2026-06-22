import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListingService } from '@/app/core/service/ws/listing/listing.service';
import { ApplicationDto, ListingDto, NeedEnumDto } from '@/app/api/webapiservice';

@Component({
  selector: 'app-listing-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listing-details.component.html',
  styleUrl: './listing-details.component.scss',
})
export class ListingDetailsComponent implements OnInit {
  NeedEnumDto = NeedEnumDto;

  listing: ListingDto | null = null;
  loading = true;
  actionLoading = false;
  error: string | null = null;

  selectedApplication: ApplicationDto | null = null;
  showApplicationModal = false;

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadListing(id);
  }

  private loadListing(id: string): void {
    this.loading = true;
    this.listingService.getListingById(id).subscribe({
      next: (res) => {
        this.listing = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de charger les détails de cette annonce.';
        this.loading = false;
      },
    });
  }

  get pricePerKg(): number {
    return this.listing?.pricePerKg ?? 0;
  }

  get weightKg(): number {
    const grams = this.listing?.availableWeightInGrams ?? this.listing?.desiredWeightInGrams ?? 0;
    return grams / 1000;
  }

  openApplicationDetail(app: ApplicationDto): void {
    this.selectedApplication = app;
    this.showApplicationModal = true;
  }

  closeApplicationModal(): void {
    this.showApplicationModal = false;
    this.selectedApplication = null;
  }

  deleteListing(): void {
    if (!this.listing?.id || this.actionLoading) return;
    this.actionLoading = true;

    this.listingService.deleteListing(this.listing.id).subscribe({
      next: () => {
        this.actionLoading = false;
        history.back();
      },
      error: () => {
        this.actionLoading = false;
      },
    });
  }
}
