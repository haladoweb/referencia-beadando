import { Component, inject, OnInit, signal } from '@angular/core';
import { BuildingStore } from '../../buildings/store/building.store';
import { TextInput } from '../../../core/components/text-input/text-input';
import { form } from '@angular/forms/signals';
import { BuildingSearchPipe } from '../../buildings/pipes/building-search-pipe';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-buildings-list',
  imports: [TextInput, BuildingSearchPipe, RouterLink],
  templateUrl: './buildings-list.html',
  styleUrl: './buildings-list.css',
})
export class BuildingsList implements OnInit {
  protected readonly buildingStore = inject(BuildingStore);
  protected readonly router = inject(Router);

  ngOnInit(): void {
    this.buildingStore.getBuildings();
  }

  filterModel = signal({ name: '' });
  searchForm = form(this.filterModel);

  onEdit(buildingId: string) {
    this.router.navigate(['buildings', buildingId]);
  }

  onDelete(buildingId: string) {
    this.buildingStore.deleteBuilding(buildingId);
  }
}
