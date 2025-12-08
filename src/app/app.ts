import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Navbar } from './core/components/navbar/navbar';
import { Spinner } from './core/components/spinner/spinner';
import { Sidebar } from './core/components/sidebar/sidebar';
import { AuthStore } from './features/auth/store/auth.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Spinner, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly router = inject(Router);
  protected readonly authStore = inject(AuthStore);

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          if (typeof window !== 'undefined' && window.HSStaticMethods) {
            window.HSStaticMethods.autoInit();
          }
        }, 100);
      }
    });
  }
}
