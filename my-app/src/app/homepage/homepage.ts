import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.html',
   imports: [
    CommonModule
  ],
  styleUrls: ['./homepage.css'],
})
export class Homepage implements OnInit {
  news: any[] = [];
  isLoading: boolean = true;
  error: string = '';
  hasError: boolean = false;

constructor(private newsService: NewsService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    console.log('Homepage ngOnInit called');
    this.loadNews();
  }

  loadNews() {
    this.isLoading = true;
    this.hasError = false;
    this.error = '';
    this.news = [];
    
    console.log('Starting API call...');
    
    this.newsService.getNews().subscribe({
      next: (data: any) => { console.log('API call successful:', data);
        if (data && data.results && Array.isArray(data.results)) 
          { this.news = data.results; 
            console.log('News loaded:', this.news.length, 'items');
          this.isLoading = false } 
        else { console.warn('Unexpected data format:', data); this.news = []; } 
        this.isLoading = false;
this.cd.detectChanges();
         }, 
         
        error: (error) => { console.error('API call failed:', error); this.error = 'Помилка завантаження новин'; 
          this.hasError = true; this.isLoading = false;
this.cd.detectChanges();
          this.news = []; }, 
        complete: () => { console.log('API call completed'); this.isLoading = false;
          }
    });
  }

}