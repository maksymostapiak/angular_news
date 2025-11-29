import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Theme } from './theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('my-app');
    currentTheme = 'light';
  
    constructor(private theme: Theme) {}
  
    ngOnInit() {
      this.theme.theme$.subscribe(t => {
        this.currentTheme = t;
      });
    }
}
