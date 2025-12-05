import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
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
