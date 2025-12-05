import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Building } from '../model/building.model';
import { computed, inject } from '@angular/core';
import { BuildingService } from '../services/building.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { Router } from '@angular/router';
import { PolygonOptions } from '../../../core/model/polygon.model';

interface BuildingsState {
  buildings: Building[];
  editedBuilding: Building | null;
}

const initialState: BuildingsState = {
  buildings: [],
  editedBuilding: null,
};

export const BuildingStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ buildings, editedBuilding }) => ({
    buildingPolygons: computed<PolygonOptions[]>(() =>
      buildings().map((building) => ({
        coordinates: building.boundary,
        color: building.color,
        popUpTitle: `${building.fullName} (${building.name})`,
        popUpContent: building.description,
      }))
    ),
    editedBuildingPolygon: computed<PolygonOptions | null>(() =>
      editedBuilding()
        ? {
            coordinates: editedBuilding()!.boundary,
            color: editedBuilding()!.color,
            popUpTitle: `${editedBuilding()!.fullName} (${editedBuilding()!.name})`,
            popUpContent: editedBuilding()!.description,
          }
        : null
    ),
  })),
  withMethods((store, buildingService = inject(BuildingService), router = inject(Router)) => {
    const getBuildings = rxMethod<void>(
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
    );

    const getEditedBuilding = rxMethod<string>(
      pipe(
        switchMap((buildingId) =>
          buildingService.getBuildingById(buildingId).pipe(
            tapResponse({
              next: (building) => patchState(store, { editedBuilding: building }),
              error: () => {},
            })
          )
        )
      )
    );

    const createBuilding = rxMethod<Building>(
      pipe(
        switchMap((building) =>
          buildingService.createBuilding(building).pipe(
            tapResponse({
              next: () => {
                getBuildings();
                router.navigateByUrl('/buildings');
              },
              error: () => {},
            })
          )
        )
      )
    );

    const updateBuilding = rxMethod<Building>(
      pipe(
        switchMap((building) =>
          buildingService.updateBuilding(building).pipe(
            tapResponse({
              next: () => {
                getBuildings();
                router.navigateByUrl('/buildings');
              },
              error: () => {},
            })
          )
        )
      )
    );

    const deleteBuilding = rxMethod<string>(
      pipe(
        switchMap((buildingId) =>
          buildingService.deleteBuilding(buildingId).pipe(
            tapResponse({
              next: () => getBuildings(),
              error: () => {},
            })
          )
        )
      )
    );

    const clearEditedBuilding = () => patchState(store, { editedBuilding: null });

    return {
      getBuildings,
      getEditedBuilding,
      createBuilding,
      updateBuilding,
      deleteBuilding,
      clearEditedBuilding,
    };
  })
);
