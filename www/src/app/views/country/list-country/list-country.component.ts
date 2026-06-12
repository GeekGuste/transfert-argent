import { CountryService } from '@/app/core/service/ws/country/country.service';
import { GlobalErrorService } from '@/app/core/service/global-error.service';
import { CountryDto } from '@/app/api/webapiservice';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TrlPipe } from '@alrevele/translator';

declare var bootstrap: any;

@Component({
  selector: 'app-list-country',
  imports: [CommonModule, ReactiveFormsModule, TrlPipe],
  templateUrl: './list-country.component.html',
  styleUrl: './list-country.component.scss',
})
export class ListCountryComponent implements OnInit {
  loading = false;
  updateLoading = false;
  editForm!: FormGroup;
  countries: any[] = [];

  private modalInstance: any = null;

  constructor(
    private countryService: CountryService,
    private errorService: GlobalErrorService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      code: ['', Validators.required],
      isEnabled: [false, Validators.required],
    });
    this.initCountries();
  }

  initCountries(): void {
    this.loading = true;
    this.countryService.getCountries().subscribe({
      next: (response: any) => {
        this.countries = response.countries ?? [];
        this.loading = false;
      },
      error: (err) => {
        this.errorService.handleHttpError(err);
        this.loading = false;
      },
    });
  }

  openEditModal(country: any): void {
    this.editForm.patchValue(country);
    this.editForm.markAsUntouched();
    const modalEl = document.getElementById('editCountryModal');
    if (modalEl) {
      this.modalInstance = new bootstrap.Modal(modalEl);
      this.modalInstance.show();
    }
  }

  updateCountry(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const { id, name, code, isEnabled } = this.editForm.value;
    const body = new CountryDto({ name, code, isEnabled });

    this.updateLoading = true;
    this.countryService.updateCountry(id, body).subscribe({
      next: () => {
        this.updateLoading = false;
        this.modalInstance?.hide();
        this.initCountries();
        this.errorService.success('Pays mis à jour avec succès.');
      },
      error: (err) => {
        this.updateLoading = false;
        this.errorService.handleHttpError(err);
      },
    });
  }

  deleteCountry(_country: any): void {
    alert("Cette fonctionnalité n'est pas encore développée");
  }
}
