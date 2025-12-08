import { Routes } from '@angular/router';
import { EditBuilding } from './features/components/edit-building/edit-building';
import { BuildingsList } from './features/components/buildings-list/buildings-list';
import { CampusMap } from './features/campus-map/components/campus-map/campus-map';
import { Login } from './features/auth/components/login/login';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

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
    canActivate: [authGuard],
  },
  {
    path: '',
    component: CampusMap,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: Login,
    canActivate: [loginGuard],
  },
  {
    path: '**',
    redirectTo: 'buildings',
  },
];
