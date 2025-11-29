import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Theme {
  private themeSubject = new BehaviorSubject<'light' | 'dark'>('light');
  theme$ = this.themeSubject.asObservable();

  constructor() {
    const saved = localStorage.getItem('theme') as 'light' | 'dark';
    if (saved) this.setTheme(saved);
  }

  setTheme(theme: 'light' | 'dark') {
    this.themeSubject.next(theme);
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }

  getTheme() {
    return this.themeSubject.getValue();
  }
}
