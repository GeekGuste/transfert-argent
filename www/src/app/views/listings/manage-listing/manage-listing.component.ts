import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListingService } from '@/app/core/service/ws/listing/listing.service';
import { GlobalErrorService } from '@/app/core/service/global-error.service';
import { ApplicationDto, ListingDto, NeedEnumDto } from '@/app/api/webapiservice';
import { NavbarComponent } from '@/app/shared/navbar/navbar.component';
import { FrontI18nPipe } from '@/app/shared/pipes/front-i18n.pipe';

@Component({
  selector: 'app-manage-listing',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FrontI18nPipe],
  templateUrl: './manage-listing.component.html',
  styleUrl: './manage-listing.component.scss',
})
export class ManageListingComponent implements OnInit {
  NeedEnumDto = NeedEnumDto;

  token: string | null = null;
  listing: ListingDto | null = null;
  loading = true;
  error: string | null = null;

  actionLoading = false;
  actionSuccess: string | null = null;
  validatingApplicationId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingService,
    private errorService: GlobalErrorService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    if (this.token) {
      this.loadListing();
    } else {
      this.error = 'Lien invalide.';
      this.loading = false;
    }
  }

  loadListing(): void {
    this.loading = true;
    this.listingService.getListingByToken(this.token!).subscribe({
      next: (res) => { this.listing = res; this.loading = false; },
      error: (err) => {
        this.errorService.handleHttpError(err);
        this.error = 'Impossible de charger cette annonce. Le lien est peut-être invalide ou expiré.';
        this.loading = false;
      },
    });
  }

  get pricePerKg(): number { return this.listing?.pricePerKg ?? 0; }
  get weightKg(): number {
    return ((this.listing?.availableWeightInGrams ?? this.listing?.desiredWeightInGrams ?? 0)) / 1000;
  }
  get initials(): string {
    return `${this.listing?.firstName?.charAt(0) ?? ''}${this.listing?.lastName?.charAt(0) ?? ''}`.toUpperCase();
  }

  confirmActive(): void {
    if (!this.token || this.actionLoading) return;
    this.actionLoading = true;
    this.actionSuccess = null;

    this.listingService.confirmListingActive(this.token).subscribe({
      next: () => {
        this.actionSuccess = 'Votre annonce a été confirmée comme active.';
        this.actionLoading = false;
        if (this.listing) this.listing.isActive = true;
      },
      error: (err) => {
        this.errorService.handleHttpError(err);
        this.actionLoading = false;
      },
    });
  }

  deactivate(): void {
    if (!this.token || this.actionLoading) return;
    this.actionLoading = true;
    this.actionSuccess = null;

    this.listingService.deactivateListing(this.token).subscribe({
      next: () => {
        this.actionSuccess = 'Votre annonce a été désactivée.';
        this.actionLoading = false;
        if (this.listing) this.listing.isActive = false;
      },
      error: (err) => {
        this.errorService.handleHttpError(err);
        this.actionLoading = false;
      },
    });
  }

  validateApplication(application: ApplicationDto): void {
    if (!this.token || !application.id || this.actionLoading) return;
    this.validatingApplicationId = application.id;
    this.actionLoading = true;
    this.actionSuccess = null;

    this.listingService.validateApplication(this.token, application.id).subscribe({
      next: () => {
        this.actionSuccess = `La candidature de ${application.firstName} ${application.lastName} a été validée. Votre annonce est maintenant désactivée.`;
        this.actionLoading = false;
        this.validatingApplicationId = null;
        if (this.listing) this.listing.isActive = false;
      },
      error: (err) => {
        this.errorService.handleHttpError(err);
        this.actionLoading = false;
        this.validatingApplicationId = null;
      },
    });
  }
}
