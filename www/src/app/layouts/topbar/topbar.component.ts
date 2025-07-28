import { changetheme } from '@/app/store/layout/layout-action'
import { getLayoutColor } from '@/app/store/layout/layout-selector'
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { Store } from '@ngrx/store'
import { SimplebarAngularModule } from 'simplebar-angular'
import { TabItems } from './data'
import { environment } from '@/environments/environment'
import { AuthService } from '@/app/core/service/ws/auth/auth.service'

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    NgbDropdownModule,
    SimplebarAngularModule,
    NgbNavModule,
    RouterModule,
  ],
  templateUrl: './topbar.component.html',
  styles: ``,
})
export class TopbarComponent implements OnInit {
  tabItems = TabItems
  store = inject(Store)
  scrollY = 0
  @Output() mobileMenuButtonClicked = new EventEmitter()
  endpointForImage = environment.endpointForImage;
  user! : any | null;
  constructor(
     private router:Router,
    private authService:AuthService
  ) {
        this.authService.currentUser.subscribe(currentUser => this.user = currentUser)

    window.addEventListener('scroll', this.handleScroll, { passive: true })
    this.handleScroll()
  }
  ngOnInit(): void {
    this.authService.getUserByToken().subscribe(
      (response: any) => {this.user = response},
      err => {
        this.logout();
      }
    );  }

  toggleMobileMenu() {
    this.mobileMenuButtonClicked.emit()
  }

  // Change Theme
  changeTheme() {
    const color = document.documentElement.getAttribute('data-bs-theme')
    if (color == 'light') {
      this.store.dispatch(changetheme({ color: 'dark' }))
    } else {
      this.store.dispatch(changetheme({ color: 'light' }))
    }
    this.store.select(getLayoutColor).subscribe((color) => {
      document.documentElement.setAttribute('data-bs-theme', color)
    })
  }
  handleScroll = () => {
    this.scrollY = window.scrollY
  }

   logout(){
    this.authService.logout();
    this.user = null;
    this.router.navigateByUrl('');
  }
}
