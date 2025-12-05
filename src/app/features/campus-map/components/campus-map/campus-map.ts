import { Component, inject, OnInit, signal } from '@angular/core';
import { BuildingStore } from '../../../buildings/store/building.store';
import { form } from '@angular/forms/signals';
import { TextInput } from '../../../../core/components/text-input/text-input';
import { Map } from '../../../../core/components/map/map';

@Component({
  selector: 'app-campus-map',
  imports: [TextInput, Map],
  templateUrl: './campus-map.html',
  styleUrl: './campus-map.css',
})
export class CampusMap implements OnInit {
  protected readonly buildingStore = inject(BuildingStore);

  ngOnInit(): void {
    this.buildingStore.getBuildings();
  }

  protected readonly searchModel = signal({ name: '' });
  protected readonly searchForm = form(this.searchModel);
}
