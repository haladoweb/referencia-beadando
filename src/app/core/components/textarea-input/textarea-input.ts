import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { Input } from '../input.component';

@Component({
  selector: 'app-textarea-input',
  imports: [CommonModule, Field],
  templateUrl: './textarea-input.html',
  styleUrl: './textarea-input.css',
})
export class TextareaInput extends Input<string> {}
