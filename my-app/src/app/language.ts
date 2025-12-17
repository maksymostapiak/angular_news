import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private languageSubject = new BehaviorSubject<'ua' | 'en'>('ua');
  language$ = this.languageSubject.asObservable();

  constructor() {
    const saved = localStorage.getItem('language') as 'en' | 'ua';
    if (saved) {
      this.setLanguage(saved);
    }
  }

  setLanguage(language: 'en' | 'ua') {
    this.languageSubject.next(language);
    localStorage.setItem('language', language);
  }

  getLanguage() {
    return this.languageSubject.getValue();
  }
}