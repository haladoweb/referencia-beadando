import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Field, FieldTree } from '@angular/forms/signals';

@Component({
  selector: 'app-textarea-input',
  imports: [CommonModule, Field],
  templateUrl: './textarea-input.html',
  styleUrl: './textarea-input.css',
})
export class TextareaInput {
  field = input.required<FieldTree<string>>();
  label = input.required<string>();
}
