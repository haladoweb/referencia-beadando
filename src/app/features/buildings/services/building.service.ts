import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Building } from '../model/building.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  private readonly http = inject(HttpClient);
  private readonly buildingUrl = `${environment.apiUrl}/buildings`;

  getBuildings() {
    return this.http.get<Building[]>(`${this.buildingUrl}`);
  }

  getBuildingById(buildingId: string) {
    return this.http.get<Building>(`${this.buildingUrl}/${buildingId}`);
  }

  createBuilding(building: Building) {
    return this.http.post<Building>(`${this.buildingUrl}`, building);
  }

  updateBuilding(building: Building) {
    return this.http.put<Building>(`${this.buildingUrl}/${building.id}`, building);
  }

  deleteBuilding(buildingId: string) {
    return this.http.delete(`${this.buildingUrl}/${buildingId}`);
  }
}
