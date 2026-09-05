import { Component } from '@angular/core'
import { CountryList } from '../../data'


@Component({
  selector: 'reports-country',
  standalone: true,
  imports: [],
  templateUrl: './country.component.html',
  styles: ``,
})
export class CountryComponent {
  countries = CountryList
}
