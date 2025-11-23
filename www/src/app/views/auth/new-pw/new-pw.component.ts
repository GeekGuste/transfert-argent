import { AuthService } from '@/app/core/service/ws/auth/auth.service'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'

@Component({
  selector: 'app-new-pw',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './new-pw.component.html',
  styles: ``,
})
export class NewPwComponent {
  recoverForm: FormGroup
  loading = false
  hasEmailSent = false
  hasError = false

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    const email = this.route.snapshot.queryParamMap.get('email') || '';
    this.recoverForm = this.fb.group({
      code: ['', [Validators.required]],
      email: [email, [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]]
    })
  }

  resetAccount() {
    if (this.recoverForm.invalid ||
        this.recoverForm.value.password !== this.recoverForm.value.confirmpassword) {
      this.hasError = true
      return
    }
    this.loading = true
    this.hasError = false
    this.authService.resetPassword(this.recoverForm.value).subscribe({
      next: (response) => {
        // Redirection après login réussi
        this.loading = false
        this.hasEmailSent = true
        this.router.navigateByUrl('auth/log-in');
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }
}
