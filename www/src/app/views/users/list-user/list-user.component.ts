import { UserService } from '@/app/core/service/ws/user/user.service';
import { TrlPipe } from '@alrevele/translator';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin, mergeMap } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-list-user',
  imports: [CommonModule, ReactiveFormsModule, TrlPipe],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss',
})
export class ListUserComponent implements OnInit {
  loading = false;
  currentUser: any = null;
  editForm!: FormGroup;

  users: any[] = [];
  roles: any[] = [];

  constructor(private userService: UserService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      userName: ['', [Validators.required, Validators.email]],
      role: [null], // Assuming single role selection for now
      isEnabled: [false, Validators.required],
    });
    this.initData();
  }

  initData() {
    this.initUsers();
    this.initRoles();
  }

  initUsers() {
    this.userService.getUsers().subscribe(
      (response: any) => {
        this.users = response;
      },
      (err) => { },
      () => { },
    );
  }

  initRoles() {
    this.userService.getUserRoles().subscribe(
      (response: any) => {
        this.roles = response;
      },
      (err) => { },
      () => { }
    );
  }

  editUser(user: any) {
    this.editForm.patchValue(user);
    // If user has roles array, access the first one or map accordingly.
    // Assuming user object has a 'role' property or we need to extract it.
    // For now, simple patchValue. If structure differs, we might need:
    // this.editForm.get('role')?.setValue(user.roles?.[0]?.name || user.role);

    const modal = new bootstrap.Modal(
      document.getElementById('editUserModal')
    );
    modal.show();
  }

  updateUser() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const userPayload = this.editForm.value;

    // We run both updates.
    // Note: If the backend handles role update in updateUser, this might be redundant,
    // but the user explicitly asked for role update management via the new endpoint.
    const updateProfile$ = this.userService.updateUser(userPayload);
    const updateRole$ = this.userService.updateUserRoles(userPayload);

    forkJoin([updateProfile$, updateRole$])
      .pipe(mergeMap(() => this.userService.getUsers()))
      .subscribe(
        (response: any) => {
          this.users = response;
          this.loading = false;
          const modal = bootstrap.Modal.getInstance(
            document.getElementById('editUserModal')
          );
          modal.hide();
        },
        () => {
          this.loading = false;
        }
      );
  }

  deactivateUser(user: any) {
    this.loading = true;
    this.currentUser = user;

    this.userService
      .deactivateUser(user)
      .pipe(mergeMap(() => this.userService.getUsers()))
      .subscribe(
        (response: any) => {
          this.users = response;
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          // Gère l'erreur ici si nécessaire
        },
      );
  }

  activateUser(user: any) {
    this.loading = true;
    this.currentUser = user;

    this.userService
      .activateUser(user)
      .pipe(mergeMap(() => this.userService.getUsers()))
      .subscribe(
        (response: any) => {
          this.users = response;
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          // Gère l'erreur ici si nécessaire
        },
      );
  }

    openEditModal(service: any) {
    this.editForm.patchValue(service); // remplit le form
    const modal = new bootstrap.Modal(
      document.getElementById('editServiceModal')
    );
    modal.show();
  }

  deleteUser(user: any) {
    alert("cette fonctionnalité n'est pas encore développée");

    //   this.userService
    //     .deleteUser(user)
    //     .pipe(mergeMap(() => this.userService.getUsers()))
    //     .subscribe(
    //       (response: any) => {
    //         this.users = response;
    //       },
    //       (err) => {
    //         // Gère l'erreur si nécessaire
    //       },
    //     );
  }
}
