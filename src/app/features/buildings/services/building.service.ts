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

  createBuilding(building: Building) {
    return this.http.post<Building>(`${this.buildingUrl}`, building);
  }
}
