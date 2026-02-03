import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.scss']
})
export class AddListingComponent {

  // Stepper
  currentStep = signal(1);

  steps = [
    { id: 1, label: 'Identité / Besoin' },
    { id: 2, label: 'Voyage / Colis' },
    { id: 3, label: 'Infos supplémentaires' },
    { id: 4, label: 'Paiement / Validation' },
    { id: 5, label: 'Confirmation' }
  ];

  // FormGroup
  listingForm = new FormGroup({
    // Step 1
    need: new FormControl('', Validators.required),
    fullName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),

    // Step 2
    departureDate: new FormControl('', Validators.required),
    arrivalDate: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    pricePerKg: new FormControl('', Validators.required),
    departureCountry: new FormControl('', Validators.required),
    departureCity: new FormControl('', Validators.required),
    arrivalCountry: new FormControl('', Validators.required),
    arrivalCity: new FormControl('', Validators.required),

    // Step 3
    packageDescription: new FormControl('', Validators.required),
    recipientInfo: new FormControl('', Validators.required),
    secretCode: new FormControl('', Validators.required),

    // Step 4
    paymentMethod: new FormControl('', Validators.required),
    ageRange: new FormControl('', Validators.required),
    acceptTerms: new FormControl(false, Validators.requiredTrue)
  });

  // Navigation
  nextStep() {
    if (this.currentStep() < this.steps.length) {
      this.currentStep.set(this.currentStep() + 1);
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.set(this.currentStep() - 1);
    }
  }

  goToStep(id: number) {
    this.currentStep.set(id);
  }

  // Validation par étape
  isStepValid(stepNumber: number) {
    switch (stepNumber) {
      case 1:
        return this.listingForm.controls['need'].valid &&
          this.listingForm.controls['fullName'].valid &&
          this.listingForm.controls['phone'].valid &&
          this.listingForm.controls['email'].valid;
      case 2:
        return this.listingForm.controls['departureDate'].valid &&
          this.listingForm.controls['arrivalDate'].valid &&
          this.listingForm.controls['weight'].valid &&
          this.listingForm.controls['pricePerKg'].valid &&
          this.listingForm.controls['departureCountry'].valid &&
          this.listingForm.controls['departureCity'].valid &&
          this.listingForm.controls['arrivalCountry'].valid &&
          this.listingForm.controls['arrivalCity'].valid;
      case 3:
        return this.listingForm.controls['packageDescription'].valid &&
          this.listingForm.controls['recipientInfo'].valid &&
          this.listingForm.controls['secretCode'].valid;
      case 4:
        return this.listingForm.controls['paymentMethod'].valid &&
          this.listingForm.controls['ageRange'].valid &&
          this.listingForm.controls['acceptTerms'].valid;
      default:
        return false;
    }
  }

  // Soumission finale
  submit() {
    if (this.listingForm.valid) {
      console.log('Annonce créée :', this.listingForm.value);
      this.nextStep(); // Passe à l'étape de confirmation
    } else {
      console.warn('Formulaire incomplet');
    }
  }

}
