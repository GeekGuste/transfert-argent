import { Pipe, PipeTransform } from '@angular/core';
import { FrontI18nService } from '@/app/core/service/front-i18n.service';

@Pipe({ name: 'i18n', pure: false, standalone: true })
export class FrontI18nPipe implements PipeTransform {
  constructor(private i18n: FrontI18nService) {}
  transform(key: string): string {
    return this.i18n.t(key);
  }
}
