import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, switchMap } from 'rxjs';
import { LanguageService } from './language';

@Injectable({ providedIn: 'root' })
export class NewsService {

  private language$ = new BehaviorSubject<'ua' | 'en'>('ua');

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {
    this.languageService.language$.subscribe(lang => {
      this.language$.next(lang);
    });
  }

  private buildUrl(params: string) {
    const lang = this.language$.getValue();
    const apiLang = lang === 'ua' ? 'uk' : 'en';

    return `${environment.apiUrl}/news?apikey=${environment.apiKey}&language=${apiLang}${params}`;
  }

  getNews(pageToken?: string) {
    const url = this.buildUrl(pageToken ? `&page=${pageToken}` : '');
    return this.http.get(url);
  }

  getCategoryNews(category: string, pageToken?: string) {
    const url = this.buildUrl(`&category=${category}${pageToken ? `&page=${pageToken}` : ''}`);
    return this.http.get(url);
  }

  getKeyWordsNews(keystring: string, pageToken?: string) {
    const keywords = keystring
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .join(' OR ');

    const url = this.buildUrl(`&q=${keywords}${pageToken ? `&page=${pageToken}` : ''}`);
    return this.http.get(url);
  }
}
