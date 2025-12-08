import { Component, inject, OnInit } from '@angular/core';
import { BuildingStore } from '../../../buildings/store/building.store';
import { Map } from '../../../../core/components/map/map';

@Component({
  selector: 'app-campus-map',
  imports: [Map],
  templateUrl: './campus-map.html',
  styleUrl: './campus-map.css',
})
export class CampusMap implements OnInit {
  protected readonly buildingStore = inject(BuildingStore);

  ngOnInit(): void {
    this.buildingStore.getBuildings();
  }
}
