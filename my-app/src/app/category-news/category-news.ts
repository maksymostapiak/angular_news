import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../news';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-news.html',
  styleUrl: './category-news.css',
})
export class Category_news implements OnInit {

  news: any[] = [];
  category = '';
  categories: { [key: string]: string } = {
  "politics": "політики",
  "sports": "спорту",
  "business": "бізнесу",
  "technology": "технологій",
  "science": "науки",
  "health": "здоров`я",
  "education": "освіти",
  "environment": "довкілля"
};
  isLoading = false;
  isLoadingMore = false;
  hasError = false;
  error = '';

  nextPageToken: string | null = null;
  allLoaded = false;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
    this.category = params.get('type') || 'politics';
    this.loadNews();
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

    this.newsService.getCategoryNews(this.category, pageToken).subscribe({
      next: (data: any) => {
        console.log('API response:', data);

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
    if (this.scrollBlocked || this.allLoaded || this.isLoadingMore) return;

    this.scrollBlocked = true;
    setTimeout(() => this.scrollBlocked = false, 500);

    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.body.offsetHeight;

    if (scrollPosition >= pageHeight - 150 && this.nextPageToken) {
      this.loadNews(this.nextPageToken, true);
    }
  }
}
