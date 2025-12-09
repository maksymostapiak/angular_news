import { Component, OnInit, HostListener } from '@angular/core';
import { NewsService } from '../news';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-business',
  imports: [CommonModule],
  templateUrl: './business.html',
  styleUrl: './business.css',
})
export class Business implements OnInit {

  news: any[] = [];
  isLoading = false;
  isLoadingMore = false;
  hasError = false;
  error = '';

  nextPageToken: string | null = null;
  allLoaded = false;

  constructor(private newsService: NewsService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews(pageToken?: string, append = false) {
    if (append && this.isLoadingMore) return;
    if (!append && this.isLoading) return;

    if (append) {
      this.isLoadingMore = true;
    } else {
      this.resetPagination();
      this.isLoading = true;
      this.news = [];
    }

    this.newsService.getCategoryNews('business',pageToken).subscribe({
      next: (data: any) => {
        const items = data?.results || [];

        this.news = append ? [...this.news, ...items] : items;
        this.nextPageToken = data?.nextPage || null;
        this.allLoaded = !this.nextPageToken;

        this.isLoading = false;
        this.isLoadingMore = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.error = 'Помилка завантаження новин';
        this.hasError = true;
        this.isLoading = false;
        this.isLoadingMore = false;
        this.cd.detectChanges();
      }
    });
  }

  resetPagination() {
    this.nextPageToken = null;
    this.allLoaded = false;
    this.isLoadingMore = false;
  }

  private scrollBlocked = false;

@HostListener('window:scroll', [])
onScroll() {
  if (this.scrollBlocked) return;

  this.scrollBlocked = true;
  setTimeout(() => this.scrollBlocked = false, 500);

  if (this.allLoaded || this.isLoadingMore) return;

  const scrollPosition = window.innerHeight + window.scrollY;
  const pageHeight = document.body.offsetHeight;

  if (scrollPosition >= pageHeight - 150) {
    if (this.nextPageToken) {
      this.loadNews(this.nextPageToken, true);
    }
  }
}
}