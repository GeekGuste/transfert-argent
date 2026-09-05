import { Component, inject } from '@angular/core'
import { TaskDetails } from './data'
import {
  NgbAccordionModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap'

import { UtilsService } from '@/app/core/service/utils.service'

@Component({
  selector: 'task-detail',
  standalone: true,
  imports: [NgbAccordionModule, NgbProgressbarModule],
  templateUrl: './task-detail.component.html',
  styles: ``,
})
export class TaskDetailComponent {
  taskList = TaskDetails

  public service = inject(UtilsService)
}
