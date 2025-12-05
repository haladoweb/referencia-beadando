import { Component, computed, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { BuildingStore } from '../../buildings/store/building.store';
import { Map } from '../../../core/components/map/map';
import { form, minLength, required } from '@angular/forms/signals';
import { TextInput } from '../../../core/components/text-input/text-input';
import { Building } from '../../buildings/model/building.model';
import { Position } from 'geojson';
import { TextareaInput } from '../../../core/components/textarea-input/textarea-input';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorPicker } from '../../../core/components/color-picker/color-picker';

@Component({
  selector: 'app-edit-building',
  imports: [Map, TextInput, TextareaInput, ColorPicker],
  templateUrl: './edit-building.html',
  styleUrl: './edit-building.css',
})
export class EditBuilding implements OnInit, OnDestroy {
  protected readonly buildingStore = inject(BuildingStore);
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);

  constructor() {
    effect(() => {
      const editedBuilding = this.buildingStore.editedBuilding();
      if (!editedBuilding) return;
      this.buildingModel.set(editedBuilding);
    });
  }

  ngOnInit(): void {
    this.initBuilding();
  }

  ngOnDestroy(): void {
    this.buildingStore.clearEditedBuilding();
  }

  protected readonly buildingModel = signal<Building>({
    name: '',
    fullName: '',
    description: '',
    boundary: [],
    color: '#285880',
  });
  protected readonly buildingForm = form(this.buildingModel, (schemePath) => {
    required(schemePath.name, { message: 'Name is required' });
    required(schemePath.fullName, { message: 'Full name is required' });
    required(schemePath.description, { message: 'Description is required' });
    minLength(schemePath.boundary, 1, { message: 'Boundary most contain at least 3 points' });
  });
  private readonly buildingId = signal<string | null>(null);

  protected readonly boundaries = computed(
    () =>
      `[${this.buildingForm
        .boundary()
        .value()
        .flatMap((coordinate) => coordinate)
        .map((boundary) => `[${boundary[0]}, ${boundary[1]}]`)
        .join(';')}]`
  );
  protected readonly title = computed(() =>
    this.buildingStore.editedBuilding()
      ? `Edit building ${this.buildingStore.editedBuilding()!.name}`
      : 'Create building'
  );

  initBuilding() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id || id === 'create') return;

    this.buildingId.set(id);
    this.buildingStore.getEditedBuilding(id);
  }

  onPolygonChanged(coordinates: Position[][]) {
    this.buildingForm.boundary().value.set(coordinates);
  }

  onSave() {
    const building = this.buildingForm().value();
    if (this.buildingStore.editedBuilding()) {
      this.buildingStore.updateBuilding({
        ...this.buildingStore.editedBuilding()!,
        ...building,
      });
    } else {
      this.buildingStore.createBuilding(building);
    }
  }

  onCancel() {
    this.router.navigateByUrl('/buildings');
  }
}
