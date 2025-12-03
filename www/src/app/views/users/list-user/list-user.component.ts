import { UserService } from '@/app/core/service/ws/user/user.service';
import { AlreveleTranslatorModule } from '@alrevele/translator';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-list-user',
  imports: [CommonModule, AlreveleTranslatorModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss',
})
export class ListUserComponent implements OnInit {
  loading = false;
  currentUser: any = null;

  users: any[] = [];
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.initUsers();
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

  editUser(user: any) {
    alert("cette fonctionnalité n'est pas encore développée");
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
