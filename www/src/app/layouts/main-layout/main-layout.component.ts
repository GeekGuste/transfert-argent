import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { version } from '../../../environments/version';
import { NavbarComponent } from '@/app/shared/navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, RouterOutlet, CommonModule, NavbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  version = version;
  currentYear = new Date().getFullYear();
}
