import { CurrencyService } from '@/app/core/service/ws/currency/currency.service'
import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { TrlPipe } from '@alrevele/translator'

@Component({
  selector: 'app-add-currency',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule, TrlPipe],
  templateUrl: './add-currency.component.html',
  styles: ``,
})
export class AddCurrencyComponent {
  fieldTextType!: boolean
  fieldTextType1!: boolean
  signupForm!: UntypedFormGroup
  submitted: boolean = false
  loading = false;
  hasWrongCredentials = false;

  public fb = inject(UntypedFormBuilder);
  public router = inject(Router);

  constructor(private currencyService: CurrencyService) {
    this.signupForm = this.fb.group(
      {
        label: ['', [Validators.required]],
        code: ['', [Validators.required]],
        symbol: ['', [Validators.required]],
      }
    )
  }

  get form() {
    return this.signupForm.controls
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;

    this.currencyService.createCurrency(this.signupForm.value).subscribe({
      next: (response) => {
        // Redirection après login réussi
        this.router.navigateByUrl('views/currency');
      },
      error: (err) => {
        this.loading = false;
        this.hasWrongCredentials = true;
      },
    });
  }
}
