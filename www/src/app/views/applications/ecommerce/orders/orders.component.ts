import { TableService } from '@/app/core/service/table.service'
import { AsyncPipe, CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import type { Observable } from 'rxjs'
import { OrderData, type OrderType } from './data'
import { currency } from '@/app/common/constants'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './orders.component.html',
  styles: ``,
})
export class OrdersComponent {
  orderList = OrderData
  currency = currency
}
