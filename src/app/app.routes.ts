import { Routes } from '@angular/router';
import { EditBuilding } from './features/components/edit-building/edit-building';
import { BuildingsList } from './features/components/buildings-list/buildings-list';
import { CampusMap } from './features/campus-map/components/campus-map/campus-map';

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
    path: '',
    component: CampusMap,
  },
  {
    path: '**',
    redirectTo: 'buildings',
  },
];
