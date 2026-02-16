import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { ListingService } from '@/app/core/service/ws/listing/listing.service';
import { Listing } from '@/app/core/models/listing.model';

import { Need } from '@/app/common/need.enum';
import { CurrencyService } from '@/app/core/service/ws/currency/currency.service';

@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.scss']
})
export class AddListingComponent {
  Need = Need;
  currencies: any[] = [];

  /* ============================
   * Stepper
   * ============================ */
  currentStep = signal(1);

  stepsVoyageur = [
    { id: 1, label: 'Identité' },
    { id: 2, label: 'Voyage' },
    { id: 3, label: 'Trajet & prix' },
    { id: 4, label: 'Paiement' },
    { id: 5, label: 'Confirmation' }
  ];

  stepsChercheur = [
    { id: 1, label: 'Identité' },
    { id: 2, label: 'Recherche' },
    { id: 3, label: 'Trajet & prix' },
    { id: 4, label: 'Paiement' },
    { id: 5, label: 'Confirmation' }
  ];

  activeSteps = computed(() =>
    this.userType === Need.VOYAGEUR
      ? this.stepsVoyageur
      : this.stepsChercheur
  );

  /* ============================
   * Formulaire
   * ============================ */
  listingForm = new FormGroup({
    need: new FormControl<Need>(Need.VOYAGEUR, Validators.required),

    identity: new FormGroup({
      lastName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      isAdult: new FormControl(false, Validators.requiredTrue),
    }),

    voyageur: new FormGroup({
      departureDate: new FormControl<Date | string | null>(new Date()),
      arrivalDate: new FormControl<Date | string | null>(new Date()),
      availableWeight: new FormControl(0),
    }),

    chercheur: new FormGroup({
      maxTravelDate: new FormControl<Date | string | null>(new Date()),
      desiredWeight: new FormControl(0),
    }),

    common: new FormGroup({
      departureLocation: new FormControl('', Validators.required),
      arrivalLocation: new FormControl('', Validators.required),
      pricePerKg: new FormControl(0, Validators.required),
      currencyId: new FormControl(0, Validators.required),
    }),

    legal: new FormGroup({
      paymentMethod: new FormControl('', Validators.required),
      acceptTerms: new FormControl(false, Validators.requiredTrue),
    }),
  });

  /* ============================
   * Getters
   * ============================ */
  get identityGroup() { return this.listingForm.get('identity') as FormGroup; }
  get voyageurGroup() { return this.listingForm.get('voyageur') as FormGroup; }
  get chercheurGroup() { return this.listingForm.get('chercheur') as FormGroup; }
  get commonGroup() { return this.listingForm.get('common') as FormGroup; }
  get legalGroup() { return this.listingForm.get('legal') as FormGroup; }
  get userType() { return this.listingForm.get('need')?.value; }

  constructor(
    private listingService: ListingService,
    private currencyService: CurrencyService
  ) {
    this.getCurrencies();
  }

  /* ============================
   * Navigation
   * ============================ */
  nextStep() {
    if (!this.isStepValid(this.currentStep())) return;
    if (this.currentStep() < this.activeSteps().length) {
      this.currentStep.set(this.currentStep() + 1);
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.set(this.currentStep() - 1);
    }
  }

  goToStep(stepId: number) {
    if (stepId <= this.currentStep()) {
      this.currentStep.set(stepId);
    }
  }

  isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return this.listingForm.get('need')!.valid && this.identityGroup.valid;
      case 2:
        return this.userType === Need.VOYAGEUR
          ? this.voyageurGroup.valid
          : this.chercheurGroup.valid;
      case 3:
        return this.commonGroup.valid;
      case 4:
        return this.legalGroup.valid;
      default:
        return true;
    }
  }

  /* ============================
   * UTC Helper (SAFE)
   * ============================ */
  private toUtcDate(date: Date | string | null): Date | null {
    if (!date) return null;

    const d = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(d.getTime())) return null;

    return new Date(Date.UTC(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      d.getHours(),
      d.getMinutes(),
      d.getSeconds(),
      d.getMilliseconds()
    ));
  }

  /* ============================
   * Soumission
   * ============================ */
  submit() {
    if (!this.listingForm.valid) {
      this.listingForm.markAllAsTouched();
      return;
    }

    const listing: Listing = {
      id: 0,

      need: this.listingForm.get('need')!.value!,
      lastName: this.identityGroup.get('lastName')!.value!,
      firstName: this.identityGroup.get('firstName')!.value!,
      phone: this.identityGroup.get('phone')!.value!,
      email: this.identityGroup.get('email')!.value!,
      isAdult: this.identityGroup.get('isAdult')!.value!,

      departureDate: this.toUtcDate(
        this.voyageurGroup.get('departureDate')!.value
      ),
      arrivalDate: this.toUtcDate(
        this.voyageurGroup.get('arrivalDate')!.value
      ),
      availableWeight: this.voyageurGroup.get('availableWeight')!.value!,

      maxTravelDate: this.toUtcDate(
        this.chercheurGroup.get('maxTravelDate')!.value
      ),
      desiredWeight: this.chercheurGroup.get('desiredWeight')!.value!,

      departureLocation: this.commonGroup.get('departureLocation')!.value!,
      arrivalLocation: this.commonGroup.get('arrivalLocation')!.value!,
      pricePerKg: this.commonGroup.get('pricePerKg')!.value!,
      currencyId: this.commonGroup.get('currencyId')!.value!,
      paymentMethod: this.legalGroup.get('paymentMethod')!.value!,
      acceptTerms: this.legalGroup.get('acceptTerms')!.value!
    };

    this.listingService.createListing(listing).subscribe({
      next: res => {
        console.log('Annonce créée :', res);
        this.currentStep.set(5);
      },
      error: err => console.error('Erreur création :', err)
    });
  }

  /* ============================
   * Currencies
   * ============================ */
  getCurrencies() {
    this.currencyService.getCurrencies().subscribe({
      next: (res: any) => {
        this.currencies = res.currencies || res;
      },
      error: err => console.error('Erreur récupération :', err)
    });
  }
}
