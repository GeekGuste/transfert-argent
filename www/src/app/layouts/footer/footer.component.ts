import { Component } from '@angular/core'
import { credits, currentYear } from '../../common/constants'
import { environment } from '../../../environments/environment'
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styles: ``,
})
export class FooterComponent {
  currentYear = currentYear;
  credits = credits
  appVersion = environment.version;
}
