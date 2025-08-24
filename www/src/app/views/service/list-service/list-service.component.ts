import { ServiceService } from '@/app/core/service/ws/service/service.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { mergeMap } from 'rxjs';

declare var bootstrap: any; // Pour contrôler le modal Bootstrap

@Component({
  selector: 'app-list-service',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './list-service.component.html',
  styleUrl: './list-service.component.scss',
})
export class ListServiceComponent implements OnInit {
  loading = false;
  currentService: any = null;

   editForm!: FormGroup;


  services: any[] = [];
  constructor(private serviceService: ServiceService,    private fb: FormBuilder
) {}
  ngOnInit(): void {
   // Création du formulaire
    this.editForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      isEnabled: [false, Validators.required],
    });
    this.initServices();
  }

  initServices() {
    this.serviceService.getServices().subscribe(
      (response: any) => {
        this.services = response.services;
      },
      (err) => {},
      () => {},
    );
  }

  editService(service: any) {
    alert("cette fonctionnalité n'est pas encore développée");
  }

  deactivateService(service: any) {
    this.loading = true;
    this.currentService = service;

    this.serviceService
      .deactivateService(service)
      .pipe(mergeMap(() => this.serviceService.getServices()))
      .subscribe(
        (response: any) => {
          this.services = response.services;
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          // Gère l'erreur ici si nécessaire
        },
      );
  }

  activateService(service: any) {
    this.loading = true;
    this.currentService = service;

    this.serviceService
      .activateService(service)
      .pipe(mergeMap(() => this.serviceService.getServices()))
      .subscribe(
        (response: any) => {
          this.services = response.services;
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          // Gère l'erreur ici si nécessaire
        },
      );
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
    this.serviceService
      .updateService(this.editForm.value) // méthode à ajouter dans le service
      .pipe(mergeMap(() => this.serviceService.getServices()))
      .subscribe(
        (response: any) => {
          this.services = response.services;
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
