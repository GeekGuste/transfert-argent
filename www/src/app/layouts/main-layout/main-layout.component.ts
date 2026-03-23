import { Language } from '@/app/core/models/language.model';
import { LanguageService } from '@/app/core/service/language.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from "@angular/router";
import { version } from "../../../environments/version";

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  mobileMenuOpen = false;
  languageDropdownOpen = false;
  currentLanguage: string = 'fr';
  version = version;
  currentYear = new Date().getFullYear();

  // Langues disponibles pour un projet international
  languages: Language[] = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  constructor(private languageService: LanguageService) {
    // Récupérer la langue actuelle
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

  ngOnInit(): void {
    // Animation au scroll (optionnel)
    this.setupScrollAnimations();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  toggleLanguageDropdown(): void {
    this.languageDropdownOpen = !this.languageDropdownOpen;
  }

  closeLanguageDropdown(): void {
    this.languageDropdownOpen = false;
  }

  changeLanguage(languageCode: string): void {
    this.currentLanguage = languageCode;
    this.languageService.setLanguage(languageCode);
    this.closeLanguageDropdown();
  }

  getCurrentLanguageName(): string {
    const lang = this.languages.find(l => l.code === this.currentLanguage);
    return lang ? lang.name : 'Français';
  }

  getCurrentLanguageFlag(): string {
    const lang = this.languages.find(l => l.code === this.currentLanguage);
    return lang ? lang.flag : '🇫🇷';
  }

  private setupScrollAnimations(): void {
    // Utilisation de IntersectionObserver pour les animations au scroll
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      // Observer les sections après un court délai pour s'assurer que le DOM est chargé
      setTimeout(() => {
        const sections = document.querySelectorAll('.step-card, .service-card, .value-card, .testimonial-card');
        sections.forEach((section) => observer.observe(section));
      }, 100);
    }
  }
}
