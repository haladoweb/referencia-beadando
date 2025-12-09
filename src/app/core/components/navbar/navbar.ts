import { Component, inject } from '@angular/core';
import { AuthStore } from '../../../features/auth/store/auth.store';
import { ThemeSwitch } from '../theme-switch/theme-switch';

@Component({
  selector: 'app-navbar',
  imports: [ThemeSwitch],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected readonly authStore = inject(AuthStore);
}
