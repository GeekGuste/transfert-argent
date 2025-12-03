import { Component, inject, ViewChild } from '@angular/core'
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouterOutlet,
  Router,
  type Event,
} from '@angular/router'
import { TitleService } from './core/service/title.service'
import { LanguageService } from './core/service/language.service'
import {
  NgProgressComponent,
  NgProgressModule,
  type NgProgressRef,
} from 'ngx-progressbar'

import { AlreveleTranslatorModule } from '@alrevele/translator'

import { environment } from '@/environments/environment'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgProgressModule, AlreveleTranslatorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  startedClass = false
  progressRef!: NgProgressRef
  @ViewChild(NgProgressComponent) progressBar!: NgProgressComponent

  private titleService = inject(TitleService)
  private router = inject(Router)
  private languageService = inject(LanguageService)

  language = this.languageService.getCurrentLanguage();
  software_key = environment.software_key;

  constructor() {
    this.router.events.subscribe((event: Event) => {
      this.checkRouteChange(event)
    })

    // S'abonner aux changements de langue pour mise à jour instantanée
    this.languageService.getLanguage$().subscribe(lang => {
      this.language = lang;
    })
  }

  ngOnInit(): void {
    this.titleService.init()
  }

  // show Loader when route change
  checkRouteChange(routerEvent: Event) {
    if (routerEvent instanceof NavigationStart) {
      this.progressBar.start()
    }
    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      setTimeout(() => {
        this.progressBar.complete()
      }, 200)
    }
  }
}
