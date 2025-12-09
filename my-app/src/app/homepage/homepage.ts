import { Component, OnInit, HostListener } from '@angular/core';
import { NewsService } from '../news';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./homepage.css'],
})
export class Homepage implements OnInit {

  news: any[] = [];
  isLoading = false;
  isLoadingMore = false;
  hasError = false;
  error = '';
  searchText = '';

  nextPageToken: string | null = null;
  allLoaded = false;

  constructor(private newsService: NewsService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadNews();
  }

  searchNews() {
    if (!this.searchText.trim()) {
      this.loadNews();
      return;
    }

    this.resetPagination();

    this.isLoading = true;
    this.news = [];

    this.newsService.getKeyWordsNews(this.searchText).subscribe({
      next: (data: any) => {
        this.news = data?.results || [];
        this.nextPageToken = data?.nextPage || null;
        this.allLoaded = !this.nextPageToken;
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.error = 'Помилка пошуку новин';
        this.isLoading = false;
        this.hasError = true;
        this.cd.detectChanges();
      }
    });
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

    this.newsService.getNews(pageToken).subscribe({
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

