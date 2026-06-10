import { CountryService } from '@/app/core/service/ws/country/country.service';
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
  currentCountry: any = null;
  editForm!: FormGroup;
  countries: any[] = [];

  constructor(private countryService: CountryService, private fb: FormBuilder) {}

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
    this.countryService.getCountries().subscribe({
      next: (response: any) => { this.countries = response.countries ?? []; },
      error: () => {},
    });
  }

  editCountry(_country: any): void {
    alert("Cette fonctionnalité n'est pas encore développée");
  }

  deleteCountry(_country: any): void {
    alert("Cette fonctionnalité n'est pas encore développée");
  }

  openEditModal(country: any): void {
    this.editForm.patchValue(country);
    const modal = new bootstrap.Modal(document.getElementById('editCountryModal'));
    modal.show();
  }

  updateCountry(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    // Update not yet available in new API
    alert("Cette fonctionnalité n'est pas encore disponible");
  }
}
