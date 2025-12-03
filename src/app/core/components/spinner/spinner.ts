import { Component, inject } from '@angular/core';
import { SpinnerStore } from '../../store/spinner.store';

@Component({
  selector: 'app-spinner',
  imports: [],
  templateUrl: './spinner.html',
  styleUrl: './spinner.css',
})
export class Spinner {
  protected readonly spinner = inject(SpinnerStore);
}
