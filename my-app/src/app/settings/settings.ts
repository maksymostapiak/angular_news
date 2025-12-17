import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Theme } from '../theme';
import { LanguageService } from '../language';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {
 theme: 'light' | 'dark' = 'light';
 language: 'ua' | 'en' = 'ua';
  constructor(private themeService: Theme, private languageService: LanguageService) {}

  ngOnInit() {
    this.theme = this.themeService.getTheme();
    this.themeService.theme$.subscribe(t => this.theme = t);

    this.language = this.languageService.getLanguage();
    this.languageService.language$.subscribe(l => this.language = l);
  }

  changeTheme(value: 'light' | 'dark') {
    this.themeService.setTheme(value);
  }
  changeLanguage(value: 'ua' | 'en') {
  this.languageService.setLanguage(value);
}
}
