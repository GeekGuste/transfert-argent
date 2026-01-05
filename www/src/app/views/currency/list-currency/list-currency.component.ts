import { CurrencyService } from '@/app/core/service/ws/currency/currency.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { mergeMap } from 'rxjs';
import { TrlPipe } from '@alrevele/translator';

declare var bootstrap: any; // Pour contrôler le modal Bootstrap

@Component({
  selector: 'app-list-currency',
  imports: [CommonModule, ReactiveFormsModule, TrlPipe],
  templateUrl: './list-currency.component.html',
  styleUrl: './list-currency.component.scss',
})
export class ListCurrencyComponent implements OnInit {
  loading = false;
  currentCurrency: any = null;

  editForm!: FormGroup;


  currencies: any[] = [];
  constructor(private currencyService: CurrencyService, private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    // Création du formulaire
    this.editForm = this.fb.group({
      id: [null],
      label: ['', Validators.required],
      code: ['', Validators.required],
      symbol: ['', Validators.required],
    });
    this.initCurrencies();
  }

  initCurrencies() {
    this.currencyService.getCurrencies().subscribe(
      (response: any) => {
        this.currencies = response.currencies;
      },
      (err) => { },
      () => { },
    );
  }

  editCurrency(country: any) {
    alert("cette fonctionnalité n'est pas encore développée");
  }

  deactivateCurrency(country: any) {
    this.loading = true;
    this.currentCurrency = country;

    this.currencyService
      .deactivateCurrency(country)
      .pipe(mergeMap(() => this.currencyService.getCurrencies()))
      .subscribe(
        (response: any) => {
          this.currencies = response.currencies;
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          // Gère l'erreur ici si nécessaire
        },
      );
  }

  activateCurrency(country: any) {
    this.loading = true;
    this.currentCurrency = country;

    this.currencyService
      .activateCurrency(country)
      .pipe(mergeMap(() => this.currencyService.getCurrencies()))
      .subscribe(
        (response: any) => {
          this.currencies = response.currencies;
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          // Gère l'erreur ici si nécessaire
        },
      );
  }

  deleteCurrency(country: any) {
    alert("cette fonctionnalité n'est pas encore développée");

    //   this.countryService
    //     .deleteCurrency(country)
    //     .pipe(mergeMap(() => this.countryService.getCountries()))
    //     .subscribe(
    //       (response: any) => {
    //         this.countries = response;
    //       },
    //       (err) => {
    //         // Gère l'erreur si nécessaire
    //       },
    //     );
  }

  openEditModal(country: any) {
    this.editForm.patchValue(country); // remplit le form
    const modal = new bootstrap.Modal(
      document.getElementById('editCurrencyModal')
    );
    modal.show();
  }

  updateCurrency() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.currencyService
      .updateCurrency(this.editForm.value) // méthode à ajouter dans le service
      .pipe(mergeMap(() => this.currencyService.getCurrencies()))
      .subscribe(
        (response: any) => {
          this.currencies = response.currencies;
          this.loading = false;
          const modal = bootstrap.Modal.getInstance(
            document.getElementById('editCurrencyModal')
          );
          modal.hide();
        },
        () => {
          this.loading = false;
        }
      );
  }
}
