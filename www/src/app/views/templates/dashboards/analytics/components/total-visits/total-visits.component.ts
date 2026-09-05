import { Component } from '@angular/core'
import { VisitsList } from '../../data'


@Component({
  selector: 'analytics-total-visits',
  standalone: true,
  imports: [],
  templateUrl: './total-visits.component.html',
  styles: ``,
})
export class TotalVisitsComponent {
  visits = VisitsList
}
