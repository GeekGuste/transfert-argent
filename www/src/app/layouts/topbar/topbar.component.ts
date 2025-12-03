import { changetheme } from '@/app/store/layout/layout-action'
import { getLayoutColor } from '@/app/store/layout/layout-selector'
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { Store } from '@ngrx/store'
import { SimplebarAngularModule } from 'simplebar-angular'
import { TabItems } from './data'
import { environment } from '@/environments/environment'
import { AuthService } from '@/app/core/service/ws/auth/auth.service'
import { LanguageService } from '@/app/core/service/language.service'
import { CommonModule } from '@angular/common'
import { AlreveleTranslatorModule } from '@alrevele/translator'

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    NgbDropdownModule,
    SimplebarAngularModule,
    NgbNavModule,
    RouterModule,
    CommonModule,
    AlreveleTranslatorModule
  ],
  templateUrl: './topbar.component.html',
  styles: ``,
})
export class TopbarComponent implements OnInit {
  tabItems = TabItems
  store = inject(Store)
  scrollY = 0
  @Output() mobileMenuButtonClicked = new EventEmitter()
  endpointForImage = environment.endpointForImage;
  user!: any | null;

  // Language management
  private languageService = inject(LanguageService)
  currentLanguage$ = this.languageService.getLanguage$()
  currentLanguage = this.languageService.getCurrentLanguage()

  languages = [
    { code: 'en', name: 'English', flag: 'assets/images/flags/us_flag.jpg' },
    { code: 'es', name: 'Spanish', flag: 'assets/images/flags/spain_flag.jpg' },
    { code: 'de', name: 'German', flag: 'assets/images/flags/germany_flag.jpg' },
    { code: 'fr', name: 'French', flag: 'assets/images/flags/french_flag.jpg' },
  ]

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(currentUser => this.user = currentUser)

    window.addEventListener('scroll', this.handleScroll, { passive: true })
    this.handleScroll()

    // Subscribe to language changes
    this.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang
    })
  }
  ngOnInit(): void {
    this.authService.getUserByToken().subscribe(
      (response: any) => { this.user = response; this.authService.setCurrentUserValue(this.user) },
      err => {
        this.logout();
      }
    );
  }

  toggleMobileMenu() {
    this.mobileMenuButtonClicked.emit()
  }

  // Change Theme
  changeTheme() {
    const color = document.documentElement.getAttribute('data-bs-theme')
    if (color == 'light') {
      this.store.dispatch(changetheme({ color: 'dark' }))
    } else {
      this.store.dispatch(changetheme({ color: 'light' }))
    }
    this.store.select(getLayoutColor).subscribe((color) => {
      document.documentElement.setAttribute('data-bs-theme', color)
    })
  }
  handleScroll = () => {
    this.scrollY = window.scrollY
  }

  logout() {
    this.authService.logout();
    this.authService.currentUser.subscribe(currentUser => {
      this.user = null; this.router.navigateByUrl('/');
    })
  }

  // Change language
  changeLanguage(languageCode: string) {
    this.languageService.setLanguage(languageCode)
  }

  // Get current language object
  getCurrentLanguageObject() {
    return this.languages.find(lang => lang.code === this.currentLanguage) || this.languages[0]
  }
}
