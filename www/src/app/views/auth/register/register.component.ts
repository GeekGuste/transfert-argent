import { AuthService } from '@/app/core/service/ws/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styles: ``,
})
export class RegisterComponent {
  fieldTextType = false;
  fieldTextType1 = false;
  signupForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  hasWrongCredentials = false;

  public fb = inject(UntypedFormBuilder);
  public router = inject(Router);

  constructor(private authService: AuthService) {
    this.signupForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmpwd: ['', [Validators.required]],
        number: ['', [Validators.pattern('^((\\+\\d{1,3}[- ]?)?\\d{10})$')]],
      },
      { validators: this.validateAreEqual },
    );
  }

  get form() {
    return this.signupForm.controls;
  }

  // Custom validator to check if password and confirm password match
  public validateAreEqual(c: AbstractControl): { notSame: boolean } | null {
    return c.value.password === c.value.confirmpwd ? null : { notSame: true };
  }

  togglePassword() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleConfirmPassword() {
    this.fieldTextType1 = !this.fieldTextType1;
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;

    // Simuler l'envoi vers un backend (à remplacer par ton AuthService)
    console.log('Form submitted:', this.signupForm.value);

    this.authService.register(this.signupForm.value).subscribe({
      next: (response) => {
        // Redirection après login réussi
        this.router.navigateByUrl('users');
      },
      error: (err) => {
        this.loading = false;
        this.hasWrongCredentials = true;
      },
    });
  }
}
