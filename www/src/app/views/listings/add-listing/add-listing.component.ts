import { Component, OnInit, signal, computed } from '@angular/core';
import { NavbarComponent } from '@/app/shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListingService } from '@/app/core/service/ws/listing/listing.service';
import { CurrencyService } from '@/app/core/service/ws/currency/currency.service';
import { CountryService } from '@/app/core/service/ws/country/country.service';
import { PaymentMethodService } from '@/app/core/service/ws/payment-method/payment-method.service';
import { GlobalErrorService } from '@/app/core/service/global-error.service';
import { futureDateValidator, dateRangeValidator } from '@/app/core/validators/date.validators';
import {
  CountryDto,
  GetCurrencyDto,
  ListingInput,
  NeedEnumDto,
  PaymentMethodDto,
  PaymentMethodEnumDto,
} from '@/app/api/webapiservice';

@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent],
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.scss'],
})
export class AddListingComponent implements OnInit {
  NeedEnumDto = NeedEnumDto;
  PaymentMethodEnumDto = PaymentMethodEnumDto;
  currencies: GetCurrencyDto[] = [];
  countries: CountryDto[] = [];
  paymentMethods: PaymentMethodDto[] = [];

  createdAccessToken: string | null = null;
  submitLoading = false;
  submitError: string | null = null;

  readonly stepsVoyageur = [
    { id: 1, label: 'Profil', icon: 'fas fa-user' },
    { id: 2, label: 'Voyage', icon: 'fas fa-plane' },
    { id: 3, label: 'Trajet', icon: 'fas fa-route' },
    { id: 4, label: 'Conditions', icon: 'fas fa-credit-card' },
    { id: 5, label: 'Confirmation', icon: 'fas fa-check-circle' },
  ];

  readonly stepsChercheur = [
    { id: 1, label: 'Profil', icon: 'fas fa-user' },
    { id: 2, label: 'Colis', icon: 'fas fa-box' },
    { id: 3, label: 'Trajet', icon: 'fas fa-route' },
    { id: 4, label: 'Conditions', icon: 'fas fa-credit-card' },
    { id: 5, label: 'Confirmation', icon: 'fas fa-check-circle' },
  ];

  currentStep = signal(1);

  listingForm = new FormGroup({
    need: new FormControl<NeedEnumDto>(NeedEnumDto.Traveler, Validators.required),

    identity: new FormGroup({
      lastName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      isAdult: new FormControl(false, Validators.requiredTrue),
    }),

    voyageur: new FormGroup(
      {
        departureDate: new FormControl<string>('', [Validators.required, futureDateValidator]),
        arrivalDate: new FormControl<string>('', [Validators.required, futureDateValidator]),
        availableWeightKg: new FormControl<number>(1, [Validators.required, Validators.min(0.1)]),
      },
      { validators: dateRangeValidator('departureDate', 'arrivalDate') }
    ),

    chercheur: new FormGroup({
      maxTravelDate: new FormControl<string>('', [Validators.required, futureDateValidator]),
      desiredWeightKg: new FormControl<number>(1, [Validators.required, Validators.min(0.1)]),
    }),

    common: new FormGroup({
      departureCountryId: new FormControl<string>('', Validators.required),
      departureCity: new FormControl('', Validators.required),
      arrivalCountryId: new FormControl<string>('', Validators.required),
      arrivalCity: new FormControl('', Validators.required),
      pricePerKg: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
      currencyId: new FormControl<string>('', Validators.required),
    }),

    legal: new FormGroup({
      paymentMethod: new FormControl<PaymentMethodEnumDto | null>(null, Validators.required),
      acceptTerms: new FormControl(false, Validators.requiredTrue),
    }),
  });

  get identityGroup() { return this.listingForm.get('identity') as FormGroup; }
  get voyageurGroup() { return this.listingForm.get('voyageur') as FormGroup; }
  get chercheurGroup() { return this.listingForm.get('chercheur') as FormGroup; }
  get commonGroup() { return this.listingForm.get('common') as FormGroup; }
  get legalGroup() { return this.listingForm.get('legal') as FormGroup; }
  get userType() { return this.listingForm.get('need')?.value; }

  activeSteps = computed(() =>
    this.userType === NeedEnumDto.Traveler ? this.stepsVoyageur : this.stepsChercheur
  );

  manageUrl = computed(() => {
    if (!this.createdAccessToken) return null;
    return `${window.location.origin}/listings/manage/${this.createdAccessToken}`;
  });

  get todayStr(): string {
    return new Date().toISOString().split('T')[0];
  }

  get selectedCurrencySymbol(): string {
    const id = this.commonGroup.get('currencyId')?.value;
    if (!id) return '';
    const c = this.currencies.find(x => x.id === id);
    return c?.symbol || c?.code || '';
  }

  get selectedDepartureCountryName(): string {
    const id = this.commonGroup.get('departureCountryId')?.value;
    if (!id) return '';
    return this.countries.find(x => x.id === id)?.name || '';
  }

  get selectedArrivalCountryName(): string {
    const id = this.commonGroup.get('arrivalCountryId')?.value;
    if (!id) return '';
    return this.countries.find(x => x.id === id)?.name || '';
  }

  constructor(
    private listingService: ListingService,
    private currencyService: CurrencyService,
    private countryService: CountryService,
    private paymentMethodService: PaymentMethodService,
    private errorService: GlobalErrorService
  ) {}

  ngOnInit(): void {
    this.loadCurrencies();
    this.loadCountries();
    this.loadPaymentMethods();
  }

  loadCurrencies(): void {
    this.currencyService.getCurrencies().subscribe({
      next: (res) => { this.currencies = res.currencies ?? []; },
      error: (err) => this.errorService.handleHttpError(err),
    });
  }

  loadCountries(): void {
    this.countryService.getActiveCountries().subscribe({
      next: (res) => { this.countries = res.countries ?? []; },
      error: (err) => this.errorService.handleHttpError(err),
    });
  }

  loadPaymentMethods(): void {
    this.paymentMethodService.getPaymentMethods().subscribe({
      next: (methods) => { this.paymentMethods = methods ?? []; },
      error: (err) => this.errorService.handleHttpError(err),
    });
  }

  nextStep(): void {
    if (!this.isStepValid(this.currentStep())) {
      this.markCurrentStepTouched();
      return;
    }
    if (this.currentStep() < this.activeSteps().length) {
      this.currentStep.update((s) => s + 1);
    }
  }

  prevStep(): void {
    if (this.currentStep() > 1) this.currentStep.update((s) => s - 1);
  }

  goToStep(stepId: number): void {
    if (stepId < this.currentStep()) this.currentStep.set(stepId);
  }

  isStepValid(step: number): boolean {
    switch (step) {
      case 1: return this.listingForm.get('need')!.valid && this.identityGroup.valid;
      case 2: return this.userType === NeedEnumDto.Traveler
        ? this.voyageurGroup.valid
        : this.chercheurGroup.valid;
      case 3: return this.commonGroup.valid;
      case 4: return this.legalGroup.valid;
      default: return true;
    }
  }

  hasStepError(step: number): boolean {
    switch (step) {
      case 1: return this.identityGroup.invalid && this.identityGroup.touched;
      case 2: return this.userType === NeedEnumDto.Traveler
        ? (this.voyageurGroup.invalid && this.voyageurGroup.touched)
        : (this.chercheurGroup.invalid && this.chercheurGroup.touched);
      case 3: return this.commonGroup.invalid && this.commonGroup.touched;
      case 4: return this.legalGroup.invalid && this.legalGroup.touched;
      default: return false;
    }
  }

  private markCurrentStepTouched(): void {
    const step = this.currentStep();
    if (step === 1) { this.identityGroup.markAllAsTouched(); }
    if (step === 2) {
      this.userType === NeedEnumDto.Traveler
        ? this.voyageurGroup.markAllAsTouched()
        : this.chercheurGroup.markAllAsTouched();
    }
    if (step === 3) this.commonGroup.markAllAsTouched();
    if (step === 4) this.legalGroup.markAllAsTouched();
  }

  getControlError(group: FormGroup, controlName: string): string | null {
    const ctrl = group.get(controlName);
    if (!ctrl || !ctrl.touched || !ctrl.errors) return null;
    if (ctrl.errors['required']) return 'Ce champ est obligatoire.';
    if (ctrl.errors['email']) return 'Adresse email invalide.';
    if (ctrl.errors['min']) return `Valeur minimale : ${ctrl.errors['min'].min}.`;
    if (ctrl.errors['pastDate']) return 'La date doit être dans le futur.';
    if (ctrl.errors['invalidDate']) return 'Date invalide.';
    return 'Valeur invalide.';
  }

  getGroupError(group: FormGroup): string | null {
    if (!group.touched) return null;
    if (group.errors?.['dateRange']) return 'La date d\'arrivée doit être après la date de départ.';
    return null;
  }

  copyLink(): void {
    const url = this.manageUrl();
    if (url) navigator.clipboard.writeText(url);
  }

  paymentMethodLabel(key: PaymentMethodEnumDto | null | undefined): string {
    const labels: Record<PaymentMethodEnumDto, string> = {
      [PaymentMethodEnumDto.Cash]: 'Espèces',
      [PaymentMethodEnumDto.CreditCard]: 'Carte bancaire',
      [PaymentMethodEnumDto.PayPal]: 'PayPal',
      [PaymentMethodEnumDto.BankTransfer]: 'Virement bancaire',
      [PaymentMethodEnumDto.MobilePayment]: 'Paiement mobile',
      [PaymentMethodEnumDto.All]: 'Tous les moyens',
      [PaymentMethodEnumDto.Other]: 'Autre',
    };
    return key ? (labels[key] ?? key) : '';
  }

  submit(): void {
    this.markCurrentStepTouched();
    if (!this.legalGroup.valid) return;

    this.submitLoading = true;
    this.submitError = null;

    const pricePerKg = this.commonGroup.get('pricePerKg')!.value ?? 0;
    const isVoyageur = this.userType === NeedEnumDto.Traveler;

    const input = new ListingInput({
      need: this.userType!,
      lastName: this.identityGroup.get('lastName')!.value!,
      firstName: this.identityGroup.get('firstName')!.value!,
      phone: this.identityGroup.get('phone')!.value!,
      email: this.identityGroup.get('email')!.value!,
      isAdult: this.identityGroup.get('isAdult')!.value!,
      departureCountryId: this.commonGroup.get('departureCountryId')!.value!,
      departureCity: this.commonGroup.get('departureCity')!.value!,
      arrivalCountryId: this.commonGroup.get('arrivalCountryId')!.value!,
      arrivalCity: this.commonGroup.get('arrivalCity')!.value!,
      pricePerKg: pricePerKg,
      currencyId: this.commonGroup.get('currencyId')!.value!,
      paymentMethod: this.legalGroup.get('paymentMethod')!.value!,
      ...(isVoyageur
        ? {
            departureDate: this.parseDate(this.voyageurGroup.get('departureDate')!.value),
            arrivalDate: this.parseDate(this.voyageurGroup.get('arrivalDate')!.value),
            availableWeightInGrams: (this.voyageurGroup.get('availableWeightKg')!.value ?? 0) * 1000,
          }
        : {
            maxTravelDate: this.parseDate(this.chercheurGroup.get('maxTravelDate')!.value),
            desiredWeightInGrams: (this.chercheurGroup.get('desiredWeightKg')!.value ?? 0) * 1000,
          }),
    });

    this.listingService.createListing(input).subscribe({
      next: (res) => {
        this.createdAccessToken = res.accessToken ?? null;
        this.submitLoading = false;
        this.currentStep.set(5);
      },
      error: (err) => {
        this.errorService.handleHttpError(err);
        this.submitError = 'Une erreur est survenue. Veuillez réessayer.';
        this.submitLoading = false;
      },
    });
  }

  private parseDate(value: string | null | undefined): Date | undefined {
    if (!value) return undefined;
    const d = new Date(value);
    return isNaN(d.getTime()) ? undefined : d;
  }
}
