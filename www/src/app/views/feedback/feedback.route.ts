import { Route } from '@angular/router';
import { ListFeedbackComponent } from './list-feedback/list-feedback.component';

export const FEEDBACK_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: ListFeedbackComponent,
    data: { title: 'Feedback' },
  },
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];
