import { Component } from '@angular/core'
import { NgClass } from '@angular/common'
import { blogData } from './data'


@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [NgClass],
  templateUrl: './blogs.component.html',
  styles: ``,
})
export class BlogsComponent {
  blogData = blogData
}
