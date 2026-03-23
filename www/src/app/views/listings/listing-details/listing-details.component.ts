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
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
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
}
