import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../../features/auth/store/auth.store';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  protected readonly authStore = inject(AuthStore);

  protected readonly sidebarItems = [
    {
      label: 'Home',
      icon: 'home',
      routerLink: '',
    },
    {
      label: 'Buildings',
      icon: 'building',
      routerLink: 'buildings',
    },
  ];

  getIconClass(icon: string) {
    return `ti ti-${icon} size-5`;
  }
}
