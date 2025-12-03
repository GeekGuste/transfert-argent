import { environment } from '@/environments/environment';
import { AlreveleTranslatorModule } from '@alrevele/translator';
import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [RouterLink, AlreveleTranslatorModule],
  templateUrl: './maintenance.component.html',
  styles: ``,
})
export class MaintenanceComponent {
  appVersion = environment.version;
}
