import { Component, inject } from '@angular/core';
import { AuthStore } from '../../../features/auth/store/auth.store';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected readonly authStore = inject(AuthStore);
}
