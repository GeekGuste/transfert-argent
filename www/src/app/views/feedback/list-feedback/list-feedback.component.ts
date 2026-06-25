import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrlPipe } from '@alrevele/translator';
import { FeedbackService } from '@/app/core/service/ws/feedback/feedback.service';
import { GlobalErrorService } from '@/app/core/service/global-error.service';
import { FeedbackDto } from '@/app/api/webapiservice';

type FilterTab = 'all' | 'unread' | 'read';

@Component({
  selector: 'app-list-feedback',
  standalone: true,
  imports: [CommonModule, TrlPipe],
  templateUrl: './list-feedback.component.html',
  styleUrl: './list-feedback.component.scss',
})
export class ListFeedbackComponent implements OnInit {
  feedbacks: FeedbackDto[] = [];
  loading = false;
  activeTab: FilterTab = 'all';
  actionLoadingId: string | null = null;
  deleteConfirmId: string | null = null;

  constructor(
    private feedbackService: FeedbackService,
    private errorService: GlobalErrorService
  ) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.loading = true;
    const isRead = this.activeTab === 'all' ? undefined
      : this.activeTab === 'read' ? true : false;
    this.feedbackService.getFeedbacks(isRead).subscribe({
      next: (res) => {
        this.feedbacks = res.feedbacks ?? [];
        this.loading = false;
      },
      error: (err) => {
        this.errorService.handleHttpError(err);
        this.loading = false;
      },
    });
  }

  setTab(tab: FilterTab): void {
    this.activeTab = tab;
    this.loadFeedbacks();
  }

  toggleRead(feedback: FeedbackDto): void {
    if (!feedback.id || this.actionLoadingId) return;
    this.actionLoadingId = feedback.id;
    const newValue = !feedback.isRead;
    this.feedbackService.markFeedbackAsRead(feedback.id, newValue).subscribe({
      next: () => {
        feedback.isRead = newValue;
        this.actionLoadingId = null;
        if (this.activeTab !== 'all') this.loadFeedbacks();
      },
      error: (err) => {
        this.errorService.handleHttpError(err);
        this.actionLoadingId = null;
      },
    });
  }

  confirmDelete(id: string): void {
    this.deleteConfirmId = id;
  }

  cancelDelete(): void {
    this.deleteConfirmId = null;
  }

  deleteFeedback(id: string): void {
    if (this.actionLoadingId) return;
    this.actionLoadingId = id;
    this.deleteConfirmId = null;
    this.feedbackService.deleteFeedback(id).subscribe({
      next: () => {
        this.feedbacks = this.feedbacks.filter(f => f.id !== id);
        this.actionLoadingId = null;
      },
      error: (err) => {
        this.errorService.handleHttpError(err);
        this.actionLoadingId = null;
      },
    });
  }

  get unreadCount(): number {
    return this.feedbacks.filter(f => !f.isRead).length;
  }
}
