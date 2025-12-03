import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { BuildingStore } from '../../buildings/store/building.store';
import { Map } from '../../../core/components/map/map';
import { form, minLength, required, submit } from '@angular/forms/signals';
import { TextInput } from '../../../core/components/text-input/text-input';
import { Building } from '../../buildings/model/building.model';
import { Position } from 'geojson';
import { TextareaInput } from '../../../core/components/textarea-input/textarea-input';

@Component({
  selector: 'app-create-building',
  imports: [Map, TextInput, TextareaInput],
  templateUrl: './create-building.html',
  styleUrl: './create-building.css',
})
export class CreateBuilding implements OnInit {
  protected readonly buildingStore = inject(BuildingStore);

  ngOnInit(): void {
    this.buildingStore.getBuildings();
  }

  protected readonly buildingModel = signal<Building>({
    name: '',
    fullName: '',
    description: '',
    boundary: [],
  });
  protected readonly buildingForm = form(this.buildingModel, (schemePath) => {
    required(schemePath.name, { message: 'Name is required' });
    required(schemePath.fullName, { message: 'Full name is required' });
    required(schemePath.description, { message: 'Description is required' });
    minLength(schemePath.boundary, 1, { message: 'Boundary most contain at least 3 points' });
  });

  protected readonly boundaries = computed(
    () =>
      `[${this.buildingForm
        .boundary()
        .value()
        .flatMap((coordinate) => coordinate)
        .map((boundary) => `[${boundary[0]}, ${boundary[1]}]`)
        .join(';')}]`
  );

  onPolygonChanged(coordinates: Position[][]) {
    this.buildingForm.boundary().value.set(coordinates);
  }

  onSave() {
    submit(this.buildingForm, async (building) => {
      this.buildingStore.createBuilding(building().value());
    });
  }
}
