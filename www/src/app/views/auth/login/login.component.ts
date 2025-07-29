import { AuthService } from '@/app/core/service/ws/auth/auth.service'
import { login } from '@/app/store/authentication/authentication.actions'
import { Component, OnInit, inject } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent implements OnInit {
  signInForm!: UntypedFormGroup
  submitted: boolean = false
  loading = false;
  hasWrongCredentials = false;
  public fb = inject(UntypedFormBuilder)
  public store = inject(Store)

  constructor(
    private authService: AuthService,
    private router: Router
  ){
  }
  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  get formValues() {
    return this.signInForm.controls
  }

  // login() {
  //   this.submitted = true
  //   if (this.signInForm.valid) {
  //     const email = this.formValues['email'].value
  //     const password = this.formValues['password'].value

  //     // Login Api
  //     this.store.dispatch(login({ email: email, password: password }))
  //   }
  // }

   login(){
    console.log(this.signInForm.value);
    this.loading = true
    this.authService.login(this.signInForm.value).subscribe(
      response => {
        this.router.navigateByUrl('users');
       },
      err => {
        //console.log('er',err);
        this.loading = false;
        this.hasWrongCredentials = true;
      }
    )
  }
}
