import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListingService } from '@/app/core/service/ws/listing/listing.service';
import { GlobalErrorService } from '@/app/core/service/global-error.service';
import { ApplicationInput, ListingDto, NeedEnumDto } from '@/app/api/webapiservice';
import { NavbarComponent } from '@/app/shared/navbar/navbar.component';

@Component({
  selector: 'app-listing-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './listing-details.component.html',
  styleUrl: './listing-details.component.scss',
})
export class ListingDetailsComponent implements OnInit {
  NeedEnumDto = NeedEnumDto;

  listing: ListingDto | null = null;
  loading = true;
  error: string | null = null;

  showModal = false;
  applyLoading = false;
  applySuccess = false;
  applyError: string | null = null;

  applicationForm = {
    lastName: '',
    firstName: '',
    phone: '',
    email: '',
    isAdult: false,
    description: '',
  };

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingService,
    private errorService: GlobalErrorService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.listingService.getListingById(id).subscribe({
        next: (res) => { this.listing = res; this.loading = false; },
        error: (err) => {
          this.errorService.handleHttpError(err);
          this.error = 'Impossible de charger les détails de cette annonce.';
          this.loading = false;
        },
      });
    }
  }

  get pricePerKg(): number {
    return this.listing?.pricePerKg ?? 0;
  }

  get weightKg(): number {
    const grams = this.listing?.availableWeightInGrams ?? this.listing?.desiredWeightInGrams ?? 0;
    return grams / 1000;
  }

  get initials(): string {
    return `${this.listing?.firstName?.charAt(0) ?? ''}${this.listing?.lastName?.charAt(0) ?? ''}`.toUpperCase();
  }

  openModal(): void {
    this.applySuccess = false;
    this.applyError = null;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    if (this.applySuccess) this.resetForm();
  }

  submitApplication(): void {
    if (!this.listing?.id) return;
    this.applyLoading = true;
    this.applyError = null;

    const input = new ApplicationInput({
      lastName: this.applicationForm.lastName,
      firstName: this.applicationForm.firstName,
      phone: this.applicationForm.phone,
      email: this.applicationForm.email,
      isAdult: this.applicationForm.isAdult,
      description: this.applicationForm.description,
      listingId: this.listing.id,
    });

    this.listingService.createApplication(input).subscribe({
      next: () => {
        this.applySuccess = true;
        this.applyLoading = false;
        if (this.listing) {
          this.listing.applicationsNumber = (this.listing.applicationsNumber ?? 0) + 1;
        }
      },
      error: (err) => {
        this.errorService.handleHttpError(err);
        this.applyError = 'Une erreur est survenue. Veuillez réessayer.';
        this.applyLoading = false;
      },
    });
  }

  private resetForm(): void {
    this.applicationForm = { lastName: '', firstName: '', phone: '', email: '', isAdult: false, description: '' };
  }
}
