import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { LanguageService } from '@/app/core/service/language.service';
import { FrontI18nPipe } from '@/app/shared/pipes/front-i18n.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive, FrontI18nPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  mobileOpen = false;
  currentLang: string;

  constructor(private langService: LanguageService) {
    this.currentLang = this.langService.getCurrentLanguage();
    this.langService.getLanguage$().subscribe(l => { this.currentLang = l; });
  }

  setLang(code: string): void {
    this.langService.setLanguage(code);
    this.currentLang = code;
  }

  toggleMobile(): void { this.mobileOpen = !this.mobileOpen; }
  closeMobile(): void { this.mobileOpen = false; }
}
