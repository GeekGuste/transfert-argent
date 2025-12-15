import { CountryService } from '@/app/core/service/ws/country/country.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { mergeMap } from 'rxjs';
import { TrlPipe } from '@alrevele/translator';

declare var bootstrap: any; // Pour contrôler le modal Bootstrap

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
  constructor(private countryService: CountryService, private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    // Création du formulaire
    this.editForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      code: ['', Validators.required],
      isEnabled: [false, Validators.required],
    });
    this.initCountries();
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

  editCountry(country: any) {
    alert("cette fonctionnalité n'est pas encore développée");
  }

  deactivateCountry(country: any) {
    this.loading = true;
    this.currentCountry = country;

    this.countryService
      .deactivateCountry(country)
      .pipe(mergeMap(() => this.countryService.getCountries()))
      .subscribe(
        (response: any) => {
          this.countries = response.countries;
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          // Gère l'erreur ici si nécessaire
        },
      );
  }

  activateCountry(country: any) {
    this.loading = true;
    this.currentCountry = country;

    this.countryService
      .activateCountry(country)
      .pipe(mergeMap(() => this.countryService.getCountries()))
      .subscribe(
        (response: any) => {
          this.countries = response.countries;
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          // Gère l'erreur ici si nécessaire
        },
      );
  }

  deleteCountry(country: any) {
    alert("cette fonctionnalité n'est pas encore développée");

    //   this.countryService
    //     .deleteCountry(country)
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
      document.getElementById('editCountryModal')
    );
    modal.show();
  }

  updateCountry() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.countryService
      .updateCountry(this.editForm.value) // méthode à ajouter dans le service
      .pipe(mergeMap(() => this.countryService.getCountries()))
      .subscribe(
        (response: any) => {
          this.countries = response.countries;
          this.loading = false;
          const modal = bootstrap.Modal.getInstance(
            document.getElementById('editCountryModal')
          );
          modal.hide();
        },
        () => {
          this.loading = false;
        }
      );
  }
}
