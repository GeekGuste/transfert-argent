import { Component } from '@angular/core';

import { Router, RouterModule, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '@/app/core/service/language.service';
import { FrontI18nPipe } from '@/app/shared/pipes/front-i18n.pipe';
import { FeedbackService } from '@/app/core/service/ws/feedback/feedback.service';
import { AuthService } from '@/app/core/service/ws/auth/auth.service';
import { CreateFeedbackInput } from '@/app/api/webapiservice';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterLinkActive, FrontI18nPipe, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  currentLang: string;

  feedbackOpen = false;
  feedbackMessage = '';
  feedbackEmail = '';
  feedbackLoading = false;
  feedbackSuccess = false;
  feedbackError: string | null = null;

  isLoggedIn = false;

  constructor(
    private langService: LanguageService,
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private router: Router
  ) {
    this.currentLang = this.langService.getCurrentLanguage();
    this.langService.getLanguage$().subscribe(l => { this.currentLang = l; });
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  setLang(code: string): void {
    this.langService.setLanguage(code);
    this.currentLang = code;
  }

  openFeedback(): void {
    this.feedbackOpen = true;
    this.feedbackSuccess = false;
    this.feedbackError = null;
    this.feedbackMessage = '';
    this.feedbackEmail = '';
  }

  closeFeedback(): void { this.feedbackOpen = false; }

  submitFeedback(): void {
    if (!this.feedbackMessage.trim()) return;
    this.feedbackLoading = true;
    this.feedbackError = null;
    const input = new CreateFeedbackInput({
      message: this.feedbackMessage.trim(),
      email: this.feedbackEmail.trim() || undefined,
    });
    this.feedbackService.createFeedback(input).subscribe({
      next: () => {
        this.feedbackLoading = false;
        this.feedbackSuccess = true;
        setTimeout(() => { this.feedbackOpen = false; }, 2500);
      },
      error: () => {
        this.feedbackLoading = false;
        this.feedbackError = this.currentLang === 'fr'
          ? 'Une erreur est survenue. Réessayez.'
          : 'An error occurred. Please try again.';
      },
    });
  }
}
