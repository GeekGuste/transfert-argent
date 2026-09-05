import { Component, inject, Input } from '@angular/core'
import type { TeamType } from '../../data'
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'

import { RouterLink } from '@angular/router'
import { UtilsService } from '@/app/core/service/utils.service'

@Component({
  selector: 'team-card',
  standalone: true,
  imports: [NgbProgressbarModule, RouterLink],
  templateUrl: './team-card.component.html',
  styles: ``,
})
export class TeamCardComponent {
  @Input() team!: TeamType

  public service = inject(UtilsService)
}
