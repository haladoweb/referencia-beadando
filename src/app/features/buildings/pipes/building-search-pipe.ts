import { Pipe, PipeTransform } from '@angular/core';
import { Building } from '../model/building.model';

@Pipe({
  name: 'buildingSearch',
})
export class BuildingSearchPipe implements PipeTransform {
  transform(buildings: Building[], searchString?: string): Building[] {
    if (!searchString || searchString.length === 0) return buildings;

    return buildings.filter(
      (building) =>
        building.name.toLowerCase().includes(searchString.toLowerCase()) ||
        building.fullName.toLowerCase().includes(searchString.toLowerCase()) ||
        building.description.toLowerCase().includes(searchString.toLowerCase())
    );
  }
}
