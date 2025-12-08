import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { ColorPickerDirective } from 'ngx-color-picker';
import { Input } from '../input.component';

@Component({
  selector: 'app-color-picker',
  imports: [ColorPickerDirective, CommonModule],
  templateUrl: './color-picker.html',
  styleUrl: './color-picker.css',
})
export class ColorPicker extends Input<string> {
  protected readonly color = computed(() => this.field()().value());

  onChange(color: string) {
    if (color && color.length > 0) {
      this.field()().value.set(color);
      this.field()().markAsDirty();
    }
  }
}
