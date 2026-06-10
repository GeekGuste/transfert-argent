import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  mobileOpen = false;
  toggleMobile(): void { this.mobileOpen = !this.mobileOpen; }
  closeMobile(): void { this.mobileOpen = false; }
}
