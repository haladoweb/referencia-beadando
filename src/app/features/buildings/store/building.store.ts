import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Building } from '../model/building.model';
import { inject } from '@angular/core';
import { BuildingService } from '../services/building.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

interface BuildingsState {
  buildings: Building[];
}

const initialState: BuildingsState = {
  buildings: [],
};

export const BuildingStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, buildingService = inject(BuildingService)) => ({
    getBuildings: rxMethod<void>(
      pipe(
        switchMap(() =>
          buildingService.getBuildings().pipe(
            tapResponse({
              next: (buildings) => patchState(store, { buildings }),
              error: () => {},
            })
          )
        )
      )
    ),

    createBuilding: rxMethod<Building>(
      pipe(
        switchMap((building) =>
          buildingService.createBuilding(building).pipe(
            tapResponse({
              next: () => {},
              error: () => {},
            })
          )
        )
      )
    ),
  }))
);
