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

type UserType = 'voyageur' | 'chercheur';

@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.scss']
})
export class AddListingComponent {

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
    this.userType === 'voyageur'
      ? this.stepsVoyageur
      : this.stepsChercheur
  );

  /* ============================
   * Formulaire
   * ============================ */
  listingForm = new FormGroup({
    need: new FormControl<UserType>('voyageur', Validators.required),

    identity: new FormGroup({
      lastName: new FormControl<string>('', Validators.required),
      firstName: new FormControl<string>('', Validators.required),
      phone: new FormControl<string>('', Validators.required),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      isAdult: new FormControl<boolean>(false, Validators.requiredTrue),
    }),

    voyageur: new FormGroup({
      departureDate: new FormControl<string>(''),
      arrivalDate: new FormControl<string>(''),
      availableWeight: new FormControl<number>(0),
    }),

    chercheur: new FormGroup({
      maxTravelDate: new FormControl<string>(''),
      desiredWeight: new FormControl<number>(0),
    }),

    common: new FormGroup({
      departurePlace: new FormControl<string>('', Validators.required),
      arrivalPlace: new FormControl<string>('', Validators.required),
      pricePerKg: new FormControl<number>(0, Validators.required),
    }),

    legal: new FormGroup({
      paymentMethod: new FormControl<string>('', Validators.required),
      acceptTerms: new FormControl<boolean>(false, Validators.requiredTrue),
    }),
  });

  /* ============================
   * Getters pour template
   * ============================ */
  get identityGroup(): FormGroup { return this.listingForm.get('identity') as FormGroup; }
  get voyageurGroup(): FormGroup { return this.listingForm.get('voyageur') as FormGroup; }
  get chercheurGroup(): FormGroup { return this.listingForm.get('chercheur') as FormGroup; }
  get commonGroup(): FormGroup { return this.listingForm.get('common') as FormGroup; }
  get legalGroup(): FormGroup { return this.listingForm.get('legal') as FormGroup; }
  get userType() { return this.listingForm.get('need')?.value; }

  constructor(private listingService: ListingService) { }

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
    if (this.currentStep() > 1) this.currentStep.set(this.currentStep() - 1);
  }

  goToStep(stepId: number) {
    if (stepId <= this.currentStep()) this.currentStep.set(stepId);
  }

  isStepValid(step: number): boolean {
    switch (step) {
      case 1: return this.listingForm.get('need')!.valid && this.identityGroup.valid;
      case 2:
        return this.userType === 'voyageur'
          ? this.voyageurGroup.valid
          : this.chercheurGroup.valid;
      case 3: return this.commonGroup.valid;
      case 4: return this.legalGroup.valid;
      default: return true;
    }
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
      id: 0, // à générer côté serveur
      need: this.listingForm.get('need')!.value,
      lastName: this.identityGroup.get('lastName')!.value,
      firstName: this.identityGroup.get('firstName')!.value,
      phone: this.identityGroup.get('phone')!.value,
      email: this.identityGroup.get('email')!.value,
      isAdult: this.identityGroup.get('isAdult')!.value,

      departureDate: this.voyageurGroup.get('departureDate')!.value,
      arrivalDate: this.voyageurGroup.get('arrivalDate')!.value,
      availableWeight: this.voyageurGroup.get('availableWeight')!.value,

      maxTravelDate: this.chercheurGroup.get('maxTravelDate')!.value,
      desiredWeight: this.chercheurGroup.get('desiredWeight')!.value,

      departurePlace: this.commonGroup.get('departurePlace')!.value,
      arrivalPlace: this.commonGroup.get('arrivalPlace')!.value,
      pricePerKg: this.commonGroup.get('pricePerKg')!.value,
      paymentMethod: this.legalGroup.get('paymentMethod')!.value,

      acceptTerms: this.legalGroup.get('acceptTerms')!.value
    };

    this.listingService.createListing(listing).subscribe({
      next: res => {
        console.log('Annonce créée :', res);
        this.currentStep.set(5);
      },
      error: err => console.error('Erreur création :', err)
    });
  }
}
