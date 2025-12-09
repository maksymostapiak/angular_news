import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) {}

  getNews(pageToken?: string) {
    const base = `${environment.apiUrl}/news?apikey=${environment.apiKey}&language=uk`;

    return this.http.get(
      pageToken ? `${base}&page=${pageToken}` : base
    );
  }

  getCategoryNews(category: string, pageToken?: string) {
    const base = `${environment.apiUrl}/news?apikey=${environment.apiKey}&language=uk&category=${category}`;

    return this.http.get(
      pageToken ? `${base}&page=${pageToken}` : base
    );
  }

  getKeyWordsNews(keystring: string, pageToken?: string) {
    const keywords = keystring.split(",").map(s => s.trim()).filter(s => s.length > 0);
    const search = keywords.join(" OR ");

    const base = `${environment.apiUrl}/news?apikey=${environment.apiKey}&language=uk&q=${search}`;

    return this.http.get(
      pageToken ? `${base}&page=${pageToken}` : base
    );
  }
}
