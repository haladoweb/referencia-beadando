import { Routes } from '@angular/router';
import { EditBuilding } from './features/components/edit-building/edit-building';
import { BuildingsList } from './features/components/buildings-list/buildings-list';

export const routes: Routes = [
  {
    path: 'buildings',
    children: [
      {
        path: '',
        component: BuildingsList,
      },
      {
        path: ':id',
        component: EditBuilding,
      },
      {
        path: 'create',
        component: EditBuilding,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'buildings',
  },
];
