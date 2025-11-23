import { Component } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'

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

  constructor(private fb: FormBuilder) {
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
    // Simule l'envoi d'email
    setTimeout(() => {
      this.loading = false
      this.hasEmailSent = true
    }, 2000)
  }
}
