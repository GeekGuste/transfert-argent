import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ApiClientService } from '@/app/api/api-client.service';
import { CreateFeedbackInput, FeedbackDto, GetFeedbacksOutput } from '@/app/api/webapiservice';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  constructor(private api: ApiClientService) {}

  createFeedback(input: CreateFeedbackInput): Observable<void> {
    return from(this.api.client.createFeedback(input));
  }

  getFeedbacks(isRead?: boolean): Observable<GetFeedbacksOutput> {
    return from(this.api.client.getFeedbacks(isRead));
  }

  markFeedbackAsRead(id: string, isRead: boolean): Observable<void> {
    return from(this.api.client.markFeedbackAsRead(id, isRead));
  }

  deleteFeedback(id: string): Observable<void> {
    return from(this.api.client.deleteFeedback(id));
  }
}
