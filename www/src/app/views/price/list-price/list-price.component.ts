import { PriceService } from '@/app/core/service/ws/price/price.service';
import { ServiceService } from '@/app/core/service/ws/service/service.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { mergeMap } from 'rxjs';
import { TrlPipe } from '@alrevele/translator';

declare var bootstrap: any; // Pour contrôler le modal Bootstrap

@Component({
  selector: 'app-list-service',
  imports: [CommonModule, ReactiveFormsModule, TrlPipe],
  templateUrl: './list-price.component.html',
  styleUrl: './list-price.component.scss',
})
export class ListPriceComponent implements OnInit {
  loading = false;
  currentService: any = null;
  editForm!: FormGroup;
  services: any[] = [];
  frequencies: any[] = [];
  subscriptions: any[] = [];

  constructor(private priceService: PriceService, private serviceService: ServiceService, private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    // Création du formulaire
    this.editForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      amount: ['', Validators.required],
      frequency: ['', Validators.required],
      currency: ['', Validators.required],
      serviceIds: [],
      isEnabled: [true]
    });
    this.initServices();
    this.initServiceOptions();
    this.initFrequencies();
  }

  initServices() {
    this.priceService.getPrices().subscribe(
      (response: any) => {
        this.subscriptions = response;
      },
      (err) => { },
      () => { },
    );
  }

  initServiceOptions() {
    this.serviceService.getServices().subscribe(
      (response: any) => {
        this.services = response.services;
      },
      (err) => { },
      () => { },
    );
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

  editService(service: any) {
    alert("cette fonctionnalité n'est pas encore développée");
  }

  deleteService(service: any) {
    alert("cette fonctionnalité n'est pas encore développée");

    //   this.serviceService
    //     .deleteService(service)
    //     .pipe(mergeMap(() => this.serviceService.getServices()))
    //     .subscribe(
    //       (response: any) => {
    //         this.services = response;
    //       },
    //       (err) => {
    //         // Gère l'erreur si nécessaire
    //       },
    //     );
  }

  openEditModal(service: any) {
    this.editForm.patchValue(service); // remplit le form
    const modal = new bootstrap.Modal(
      document.getElementById('editServiceModal')
    );
    modal.show();
  }

  updateService() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.priceService
      .updatePrice(this.editForm.value) // méthode à ajouter dans le service
      .pipe(mergeMap(() => this.priceService.getPrices()))
      .subscribe(
        (response: any) => {
          this.subscriptions = response;
          this.loading = false;
          const modal = bootstrap.Modal.getInstance(
            document.getElementById('editServiceModal')
          );
          modal.hide();
        },
        () => {
          this.loading = false;
        }
      );
  }
}
