import { TableService } from '@/app/core/service/table.service'

import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-table-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './table-header.component.html',
  styles: ``,
})
export class TableHeaderComponent {
  constructor(public tableService: TableService<any>) {}
}
