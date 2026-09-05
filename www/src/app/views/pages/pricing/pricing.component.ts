import { Component } from '@angular/core'
import { NgClass } from '@angular/common'
import { pricingData, pricingIconData } from './data'


@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [NgClass],
  templateUrl: './pricing.component.html',
  styles: ``,
})
export class PricingComponent {
  pricingData = pricingData
  pricingIconData = pricingIconData
}
