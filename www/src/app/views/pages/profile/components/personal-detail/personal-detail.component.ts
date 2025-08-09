import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  NgbDropdownModule,
  NgbNavModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { comments, lightbox } from '../../data';
import { CommonModule } from '@angular/common';
import { TobiiDirective } from '@/app/core/directive/tobii.directive';
import { credits, currentYear } from '@/app/common/constants';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '@/app/core/service/ws/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from '@/app/core/service/ws/auth/auth.service';
import { finalize, switchMap } from 'rxjs';

@Component({
  selector: 'app-personal-detail',
  standalone: true,
  imports: [
    NgbDropdownModule,
    NgbTooltipModule,
    NgbNavModule,
    CommonModule,
    TobiiDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './personal-detail.component.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class PersonalDetailComponent implements OnInit {
  lightboxData = lightbox;
  currentYear = currentYear;
  commentData = comments;
  credits = credits;
  tags = ['Music', 'Animals', 'Natural', 'Food', 'Fashion', 'Helth', 'Charity'];

  public form!: UntypedFormGroup;
  public passwordForm!: UntypedFormGroup;
  public loading = false;

  public fb = inject(UntypedFormBuilder);
  public userService = inject(UserService);
  user!: any | null;
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.authService.currentUser.subscribe((currentUser) => {
      this.user = currentUser;
      this.initForm(this.user);
    });
  }

  ngOnInit(): void {}

  initForm(user: any) {
    this.form = this.fb.group({
      firstName: [user.firstName ? user.firstName : '', Validators.required],
      id: [user.id ? user.id : '', Validators.required],
      lastName: [user.lastName ? user.lastName : '', Validators.required],
      companyName: [''],
      phone: [user.phone ? user.phone : ''],
      email: [user.userName || '', [Validators.required, Validators.email]],
      website: [''],
      country: [''],
      emailNotifications: [true],
      apiAccess: [false],
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }
  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    const payload = this.form.value;

    this.userService
      .updateUser(payload)
      .pipe(
        switchMap(() => this.authService.getUserByToken()),
        finalize(() => (this.loading = false)),
      )
      .subscribe({
        next: (response: any) => {
          this.user = response;
          this.authService.setCurrentUserValue(this.user);
        },
        error: (error) => {
          console.error('Erreur dans la mise à jour ou récupération :', error);
        },
      });
  }

  onChangePassword(): void {
    if (
      this.passwordForm.invalid ||
      this.passwordForm.value.newPassword !==
        this.passwordForm.value.confirmPassword
    ) {
      this.passwordForm.setErrors({ notSame: true });
      return;
    }

    // Appel API pour changement de mot de passe
  }
}
