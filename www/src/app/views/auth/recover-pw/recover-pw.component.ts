import { AuthService } from '@/app/core/service/ws/auth/auth.service'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'

@Component({
  selector: 'app-recover-pw',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './recover-pw.component.html',
  styles: ``,
})
export class RecoverPwComponent {
  recoverForm: FormGroup
  loading = false
  hasEmailSent = false
  hasError = false

  constructor(private fb: FormBuilder, private router: Router,    private authService: AuthService,
  ) {
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  sendRecoveryEmail() {
    if (this.recoverForm.invalid) {
      this.hasError = true
      return
    }
    this.loading = true
    this.hasError = false
    this.authService.submitForgotPassword(this.recoverForm.value).subscribe({
      next: (response) => {
        // Redirection après login réussi
        this.loading = false
        this.hasEmailSent = true
        this.router.navigateByUrl('auth/new-pw');
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }
}
