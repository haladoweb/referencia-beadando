import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { Input } from '../input.component';

@Component({
  selector: 'app-text-input',
  imports: [Field, CommonModule],
  templateUrl: './text-input.html',
  styleUrl: './text-input.css',
})
export class TextInput extends Input<string> {}
