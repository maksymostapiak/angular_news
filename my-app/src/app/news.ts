import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { SettingsService} from './news-settings';

@Injectable({ providedIn: 'root' })
export class NewsService {

  constructor(
    private http: HttpClient,
    private settingsService: SettingsService
  ) {}

  private buildUrl(params: string = ''): string {
    const lang = this.settingsService.getLanguage();
    const apiLang = lang === 'ua' ? 'uk' : 'en';

    const priority = this.settingsService.getPriority();

    let url =
      `${environment.apiUrl}/news` +
      `?apikey=${environment.apiKey}` +
      `&language=${apiLang}`+
      `&prioritydomain=${priority}`;
    return url + params;
  }

  getNews(pageToken?: string) {
    const url = this.buildUrl(pageToken ? `&page=${pageToken}` : '');
    return this.http.get(url);
  }

  getCategoryNews(category: string, pageToken?: string) {
    const url = this.buildUrl(
      `&category=${encodeURIComponent(category)}` +
      `${pageToken ? `&page=${pageToken}` : ''}`
    );
    return this.http.get(url);
  }

  getKeyWordsNews(keystring: string, pageToken?: string) {
    const keywords = keystring
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .join(' OR ');

    const url = this.buildUrl(
      `&q=${encodeURIComponent(keywords)}` +
      `${pageToken ? `&page=${pageToken}` : ''}`
    );

    return this.http.get(url);
  }
}
