import { Component, inject } from '@angular/core';
import { ThemeStore } from '../../store/theme.store';

@Component({
  selector: 'app-theme-switch',
  imports: [],
  templateUrl: './theme-switch.html',
  styleUrl: './theme-switch.css',
})
export class ThemeSwitch {
  protected readonly themeStore = inject(ThemeStore);
}
