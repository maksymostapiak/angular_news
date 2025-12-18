import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Theme } from '../theme';
import { SettingsService, Priority } from '../news-settings';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {

  theme: 'light' | 'dark' = 'light';
  language: 'ua' | 'en' = 'ua';

  priority: Priority = 'low';

  constructor(
    private themeService: Theme,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.theme = this.themeService.getTheme();
    this.themeService.theme$.subscribe(t => this.theme = t);

    this.language = this.settingsService.getLanguage();
    this.settingsService.language$.subscribe(l => this.language = l);

    this.priority = this.settingsService.getPriority();
    this.settingsService.priority$.subscribe(p => this.priority = p);
  }


  changeTheme(value: 'light' | 'dark') {
    this.themeService.setTheme(value);
  }

  changeLanguage(value: 'ua' | 'en') {
    this.settingsService.setLanguage(value);
  }

  changePriority(priority: Priority) {
    this.settingsService.setPriority(priority);
  }

}
