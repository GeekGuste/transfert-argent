import { Component } from '@angular/core'
import { NgClass } from '@angular/common'
import { notificationDetail } from '../../data'


@Component({
  selector: 'app-notification-detail',
  standalone: true,
  imports: [NgClass],
  templateUrl: './notification-detail.component.html',
  styles: ``,
})
export class NotificationDetailComponent {
  notificationDetailData = notificationDetail
}
