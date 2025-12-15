import { CountryService } from '@/app/core/service/ws/country/country.service'
import { ServiceService } from '@/app/core/service/ws/service/service.service'
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
import { TrlPipe } from '@alrevele/translator'

@Component({
  selector: 'app-add-service',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule, TrlPipe],
  templateUrl: './add-service.component.html',
  styles: ``,
})
export class AddServiceComponent {
  fieldTextType!: boolean
  fieldTextType1!: boolean
  signupForm!: UntypedFormGroup
  submitted: boolean = false
  loading = false;
  hasWrongCredentials = false;
  countries: any[] = [];

  public fb = inject(UntypedFormBuilder);
  public router = inject(Router);

  constructor(private serviceService: ServiceService, private countryService: CountryService) {
    this.initCountries();
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        isEnabled: [false],
        countries: [[]],
      }
    )
  }

  initCountries() {
    this.countryService.getCountries().subscribe(
      (response: any) => {
        this.countries = response.countries;
      },
      (err) => { },
      () => { },
    );
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

    this.serviceService.createService(this.signupForm.value).subscribe({
      next: (response) => {
        // Redirection après login réussi
        this.router.navigateByUrl('views/service');
      },
      error: (err) => {
        this.loading = false;
        this.hasWrongCredentials = true;
      },
    });
  }
}
