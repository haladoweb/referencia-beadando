import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { ColorPickerDirective } from 'ngx-color-picker';

@Component({
  selector: 'app-color-picker',
  imports: [ColorPickerDirective, CommonModule],
  templateUrl: './color-picker.html',
  styleUrl: './color-picker.css',
})
export class ColorPicker {
  readonly field = input.required<FieldTree<string>>();
  readonly label = input.required<string>();
  protected readonly color = computed(() => this.field()().value());

  onChange(color: string) {
    if (color && color.length > 0) {
      this.field()().value.set(color);
      this.field()().markAsDirty();
    }
  }
}
