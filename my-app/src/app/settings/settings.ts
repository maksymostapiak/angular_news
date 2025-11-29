import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Theme } from '../theme';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {
 theme: 'light' | 'dark' = 'light';

  constructor(private themeService: Theme) {}

  ngOnInit() {
    this.theme = this.themeService.getTheme();
    this.themeService.theme$.subscribe(t => this.theme = t);
  }

  changeTheme(value: 'light' | 'dark') {
    this.themeService.setTheme(value);
  }
}
