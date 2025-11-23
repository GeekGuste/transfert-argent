import { CountryService } from '@/app/core/service/ws/country/country.service'
import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { Router, RouterLink } from '@angular/router'

@Component({
  selector: 'app-add-country',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-country.component.html',
  styles: ``,
})
export class AddCountryComponent {
  fieldTextType!: boolean
  fieldTextType1!: boolean
  signupForm!: UntypedFormGroup
  submitted: boolean = false
  loading = false;
  hasWrongCredentials = false;

  public fb = inject(UntypedFormBuilder);
  public router = inject(Router);

  constructor(private countryService: CountryService) {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        code: ['', [Validators.required]],
      }
    )
  }

  get form() {
    return this.signupForm.controls
  }

   onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;

    this.countryService.createCountry(this.signupForm.value).subscribe({
      next: (response) => {
        // Redirection après login réussi
        this.router.navigateByUrl('views/country');
      },
      error: (err) => {
        this.loading = false;
        this.hasWrongCredentials = true;
      },
    });
  }
}
