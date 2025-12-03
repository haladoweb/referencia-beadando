import { Routes } from '@angular/router';
import { CreateBuilding } from './features/components/create-building/create-building';

export const routes: Routes = [
  {
    path: 'buildings',
    children: [
      {
        path: 'create',
        component: CreateBuilding,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'buildings/create',
  },
];
