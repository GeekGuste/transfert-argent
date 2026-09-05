import { Component } from '@angular/core'
import { CustomerOrder } from '../../data'

import { currency } from '@/app/common/constants'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'customer-details-orders',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './orders.component.html',
  styles: ``,
})
export class OrdersComponent {
  orderList = CustomerOrder
  currency = currency
}
