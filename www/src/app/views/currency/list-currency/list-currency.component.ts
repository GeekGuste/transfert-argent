import { CurrencyService } from '@/app/core/service/ws/currency/currency.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { mergeMap } from 'rxjs';
import { TrlPipe } from '@alrevele/translator';
import { CurrencyDto } from '@/app/api/webapiservice';

declare var bootstrap: any;

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

  constructor(private currencyService: CurrencyService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: [null],
      label: ['', Validators.required],
      code: ['', Validators.required],
      symbol: ['', Validators.required],
    });
    this.initCurrencies();
  }

  initCurrencies(): void {
    this.currencyService.getCurrencies().subscribe({
      next: (res) => { this.currencies = res.currencies ?? []; },
      error: () => {},
    });
  }

  openEditModal(currency: any): void {
    this.editForm.patchValue(currency);
    const modal = new bootstrap.Modal(document.getElementById('editCurrencyModal'));
    modal.show();
  }

  updateCurrency(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const { id, label, code, symbol } = this.editForm.value;
    const body = new CurrencyDto({ label, code, symbol });

    this.loading = true;
    this.currencyService
      .updateCurrency(id, body)
      .pipe(mergeMap(() => this.currencyService.getCurrencies()))
      .subscribe({
        next: (res) => {
          this.currencies = res.currencies ?? [];
          this.loading = false;
          bootstrap.Modal.getInstance(document.getElementById('editCurrencyModal'))?.hide();
        },
        error: () => { this.loading = false; },
      });
  }

  deleteCurrency(currency: any): void {
    if (!currency?.id) return;
    this.loading = true;
    this.currentCurrency = currency;

    this.currencyService
      .deleteCurrency(currency.id)
      .pipe(mergeMap(() => this.currencyService.getCurrencies()))
      .subscribe({
        next: (res) => {
          this.currencies = res.currencies ?? [];
          this.loading = false;
          this.currentCurrency = null;
        },
        error: () => { this.loading = false; },
      });
  }
}
