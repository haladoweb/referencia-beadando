import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Field, FieldTree } from '@angular/forms/signals';

@Component({
  selector: 'app-text-input',
  imports: [Field, CommonModule],
  templateUrl: './text-input.html',
  styleUrl: './text-input.css',
})
export class TextInput {
  field = input.required<FieldTree<string>>();
  label = input.required<string>();
}
