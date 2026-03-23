import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListingService } from '@/app/core/service/ws/listing/listing.service';

@Component({
  selector: 'app-listing-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listing-details.component.html',
  styleUrl: './listing-details.component.scss'
})
export class ListingDetailsComponent implements OnInit {
  listing: any = null;
  loading = true;
  error: string | null = null;

  // Modal state
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
    listingId: ''
  };

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.applicationForm.listingId = id;
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
  }

  openModal(): void {
    this.applySuccess = false;
    this.applyError = null;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    if (this.applySuccess) {
      this.resetForm();
    }
  }

  submitApplication(): void {
    this.applyLoading = true;
    this.applyError = null;

    this.listingService.createApplication(this.applicationForm).subscribe({
      next: () => {
        this.applySuccess = true;
        this.applyLoading = false;
      },
      error: (err) => {
        this.applyError = 'Une erreur est survenue. Veuillez réessayer.';
        console.error(err);
        this.applyLoading = false;
      }
    });
  }

  private resetForm(): void {
    const id = this.applicationForm.listingId;
    this.applicationForm = {
      lastName: '',
      firstName: '',
      phone: '',
      email: '',
      isAdult: false,
      description: '',
      listingId: id
    };
  }
}
