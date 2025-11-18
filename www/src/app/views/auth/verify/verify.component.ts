import { AuthService } from '@/app/core/service/ws/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss',
})
export class VerifyComponent {
  signInForm!: UntypedFormGroup;
  loading = false;
  hasWrongCredentials = false;
  submitted = false;
  hasEmailSent = false;

  // DI avec inject() pour FormBuilder et Store
  public fb = inject(UntypedFormBuilder);
  public store = inject(Store);

  constructor(
    private authService: AuthService,
    private router: Router,
      private route: ActivatedRoute
  ) {}
ngOnInit(): void {

  const email = this.route.snapshot.queryParamMap.get('email') || '';

  this.signInForm = this.fb.group({
    email: [email, [Validators.required, Validators.email]],
    code: ['', [Validators.required]],
  });
}

  get formValues() {
    return this.signInForm.controls;
  }

  verifyEmail(): void {
    this.submitted = true;
    this.hasWrongCredentials = false;

    console.log('Form Valid:', this.signInForm.valid);

    if (this.signInForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.verifyEmail(this.signInForm.value).subscribe({
      next: (response) => {
        // Redirection après login réussi
        this.router.navigateByUrl('auth/log-in');
      },
      error: (err) => {
        this.loading = false;
        this.hasWrongCredentials = true;
      },
    });
  }

    resendVerificationCode(): void {
    this.loading = true;

    this.authService.reSendCode(this.signInForm.value).subscribe({
      next: (response) => {
        // Redirection après login réussi
        if (response = true) {
          this.loading = false;
          this.hasEmailSent = true ;
        }
      },
      error: (err) => {
        this.loading = false;
        this.hasEmailSent = false;
      },
    });
  }
}
