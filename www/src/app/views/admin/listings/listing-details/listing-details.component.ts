import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListingService } from '@/app/core/service/ws/listing/listing.service';

@Component({
  selector: 'app-listing-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listing-details.component.html',
  styleUrl: './listing-details.component.scss'
})
export class ListingDetailsComponent implements OnInit {
  listing: any = null;
  loading = true;
  actionLoading = false;
  error: string | null = null;

  selectedApplication: any = null;
  showApplicationModal = false;

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadListing(id);
    }
  }

  private loadListing(id: string): void {
    this.loading = true;
    this.listingService.getListing({ id } as any).subscribe({
      next: (res: any) => {
        this.listing = res.listing ?? res;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Impossible de charger les détails de cette annonce.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  openApplicationDetail(app: any): void {
    this.selectedApplication = app;
    this.showApplicationModal = true;
  }

  closeApplicationModal(): void {
    this.showApplicationModal = false;
    this.selectedApplication = null;
  }

  toggleStatus(): void {
    if (!this.listing) return;
    this.actionLoading = true;

    const action$ = this.listing.isEnabled
      ? this.listingService.deactivateListing(this.listing)
      : this.listingService.activateListing(this.listing);

    action$.subscribe({
      next: () => {
        this.listing.isEnabled = !this.listing.isEnabled;
        this.actionLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.actionLoading = false;
      }
    });
  }
}
