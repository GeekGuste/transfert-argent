import { Component, OnInit, inject } from '@angular/core'
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '@/app/core/service/ws/auth/auth.service'
import { Store } from '@ngrx/store'
import { login } from '@/app/store/authentication/authentication.actions'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent implements OnInit {
  signInForm!: UntypedFormGroup
  loading = false
  hasWrongCredentials = false
  submitted = false

  // DI avec inject() pour FormBuilder et Store
  public fb = inject(UntypedFormBuilder)
  public store = inject(Store)

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  get formValues() {
    return this.signInForm.controls
  }

  login(): void {
    this.submitted = true
    this.hasWrongCredentials = false

    if (this.signInForm.invalid) {
      return
    }

    this.loading = true

    this.authService.login(this.signInForm.value).subscribe({
      next: (response) => {
        // Redirection après login réussi
        this.router.navigateByUrl('views/users')
      },
      error: (err) => {
        this.loading = false
        this.hasWrongCredentials = true
      }
    })
  }
}
