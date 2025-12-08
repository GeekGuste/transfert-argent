import { CountryService } from '@/app/core/service/ws/country/country.service'
import { PriceService } from '@/app/core/service/ws/price/price.service'
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
  selector: 'app-add-price',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule, TrlPipe],
  templateUrl: './add-price.component.html',
  styles: ``,
})
export class AddPriceComponent {
  fieldTextType!: boolean
  fieldTextType1!: boolean
  signupForm!: UntypedFormGroup
  submitted: boolean = false
  loading = false;
  hasWrongCredentials = false;
  services: any[] = [];
  frequencies: any[] = [];

  public fb = inject(UntypedFormBuilder);
  public router = inject(Router);

  constructor(private priceService: PriceService, private serviceService: ServiceService) {
    this.initCountries();
    this.initFrequencies();
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        amount: ['', [Validators.required]],
        frequency: ['', [Validators.required]],
        currency: ['', [Validators.required]],
        serviceIds: [],
      }
    )
  }

  initCountries() {
    this.serviceService.getServices().subscribe(
      (response: any) => {
        this.services = response.services;
      },
      (err) => { },
      () => { },
    );
  }

  get form() {
    return this.signupForm.controls
  }

  onSubmit() {
    console.log(this.signupForm.value);
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;

    this.priceService.createPrice(this.signupForm.value).subscribe({
      next: (response) => {
        // Redirection après login réussi
        this.router.navigateByUrl('views/price');
      },
      error: (err) => {
        this.loading = false;
        this.hasWrongCredentials = true;
      },
    });
  }

  initFrequencies() {
    this.priceService.getFrequencies().subscribe(
      (response: any) => {
        this.frequencies = response;
      },
      (err) => { },
      () => { },
    );
  }
}
