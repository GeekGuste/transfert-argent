import { Route } from '@angular/router'
import { ListingDetailsComponent } from '../admin/listings/listing-details/listing-details.component'
import { ListListingComponent as adminListListingsComponent } from '../admin/listings/list-listing/list-listing.component'

export const LISTINGS_ROUTES: Route[] = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: adminListListingsComponent,
        data: { title: 'Listings' },
    },
    {
        path: 'details/:id',
        component: ListingDetailsComponent,
        data: { title: 'Listing Details' },
    },

    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
    },

]
