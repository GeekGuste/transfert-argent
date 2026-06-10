import { CountryService } from '@/app/core/service/ws/country/country.service'
import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { TrlPipe } from '@alrevele/translator'
import { CountryDto } from '@/app/api/webapiservice'

@Component({
  selector: 'app-add-country',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule, TrlPipe],
  templateUrl: './add-country.component.html',
  styles: ``,
})
export class AddCountryComponent {
  signupForm!: UntypedFormGroup
  submitted = false
  loading = false
  hasWrongCredentials = false

  public fb = inject(UntypedFormBuilder)
  public router = inject(Router)

  constructor(private countryService: CountryService) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
    })
  }

  get form() { return this.signupForm.controls }

  onSubmit(): void {
    this.submitted = true
    if (this.signupForm.invalid) return

    this.loading = true
    const { name, code } = this.signupForm.value
    const body = new CountryDto({ name, code })

    this.countryService.createCountry(body).subscribe({
      next: () => { this.router.navigateByUrl('views/country') },
      error: () => { this.loading = false; this.hasWrongCredentials = true },
    })
  }
}
