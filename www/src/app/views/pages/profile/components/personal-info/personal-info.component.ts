import { AuthService } from '@/app/core/service/ws/auth/auth.service';
import { Component } from '@angular/core'
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [],
  templateUrl: './personal-info.component.html',
  styles: ``,
})
export class PersonalInfoComponent {
    user!: any | null;
    constructor(
      private router: Router,
      private authService: AuthService,
    ) {
      this.authService.currentUser.subscribe((currentUser) => {
        this.user = currentUser;
      });
    }
}
