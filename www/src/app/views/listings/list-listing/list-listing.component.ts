import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingService } from '@/app/core/service/ws/listing/listing.service';
import { Listing } from '@/app/core/models/listing.model';
import { Need } from '@/app/common/need.enum';

@Component({
  selector: 'app-list-listing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-listing.component.html',
  styleUrls: ['./list-listing.component.scss']
})
export class ListListingComponent implements OnInit {
  Need = Need;

  listings: Listing[] | any[] = [];
  travelers: any[] = [];
  senders: any[] = [];
  activeTab: 'travelers' | 'senders' = 'travelers';
  loading = true;
  error: string | null = null;

  constructor(private listingService: ListingService) { }

  ngOnInit() {
    this.fetchListings();
  }

  fetchListings() {
    this.loading = true;
    this.listingService.getListings().subscribe({
      next: (res: any) => {
        this.listings = res.listings;
        this.travelers = this.listings.filter(l => l.need.key === Need.VOYAGEUR);
        this.senders = this.listings.filter(l => l.need.key === Need.CHERCHEUR);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors de la récupération des annonces';
        console.error(err);
        this.loading = false;
      }
    });
  }
}
