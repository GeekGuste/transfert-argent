import { ChartOptions } from '@/app/common/apexchart.model'
import { currency } from '@/app/common/constants'
import { AuthService } from '@/app/core/service/ws/auth/auth.service'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'app-personal-profile',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './personal-profile.component.html',
  styles: ``,
})
export class PersonalProfileComponent {
  currency = currency
  completionChart: Partial<ChartOptions> = {
    series: [67],
    chart: {
      height: 170,
      type: 'radialBar',
      offsetY: -10,
    },
    colors: ['var(--bs-primary)'],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        track: {
          background: ['rgba(42, 118, 244, .18)'],
        },
        dataLabels: {
          name: {
            fontSize: '13px',
            offsetY: 50,
          },
          value: {
            offsetY: 5,
            fontSize: '15px',
            formatter: function (val) {
              return val + '%'
            },
          },
        },
      },
    },

    stroke: {
      dashArray: 2,
    },
    labels: ['Compleation'],
  }

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
