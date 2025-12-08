import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) {}

  getNews() {
    return this.http.get(
      `${environment.apiUrl}/news?apikey=${environment.apiKey}&language=uk`
    );
  }
  getCategoryNews(category: string){
    return this.http.get(
      `${environment.apiUrl}/news?apikey=${environment.apiKey}&language=uk&category=${category}`
    );
  }
  getKeyWordsNews(keystring: string){
    const keywords = keystring.split(",").map(s => s.trim()).filter(s => s.length > 0);
    const search = keywords.join(" OR ");
    return this.http.get(
      `${environment.apiUrl}/news?apikey=${environment.apiKey}&language=uk&q=${search}`
    );
  }
}