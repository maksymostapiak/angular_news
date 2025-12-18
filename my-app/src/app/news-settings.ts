import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export type Language = 'ua' | 'en';
export type Priority = 'low' | 'medium' | 'top';

@Injectable({ providedIn: 'root' })
export class SettingsService {

  private languageSubject = new BehaviorSubject<Language>('ua');
  language$ = this.languageSubject.asObservable();

  private prioritySubject = new BehaviorSubject<Priority>('low');
  priority$ = this.prioritySubject.asObservable();



  constructor() {
    this.loadFromStorage();
  }


  setLanguage(language: Language) {
    this.languageSubject.next(language);
    localStorage.setItem('language', language);
  }

  getLanguage(): Language {
    return this.languageSubject.getValue();
  }


  setPriority(priority: Priority) {
    this.prioritySubject.next(priority);

    if (priority === null) {
      localStorage.removeItem('priority');
    } else {
      localStorage.setItem('priority', priority);
    }
  }

  getPriority(): Priority {
    return this.prioritySubject.getValue();
  }


  private loadFromStorage() {
    const language = localStorage.getItem('language');
    const priority = localStorage.getItem('priority');

    if (language === 'ua' || language === 'en') {
      this.languageSubject.next(language);
    }

    if (priority === 'low' || priority === 'medium' || priority === 'top') {
      this.prioritySubject.next(priority);
    }
  }
}
