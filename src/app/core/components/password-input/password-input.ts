import { Component } from '@angular/core';
import { Input } from '../input.component';
import { CommonModule } from '@angular/common';
import { Field } from '@angular/forms/signals';

@Component({
  selector: 'app-password-input',
  imports: [CommonModule, Field],
  templateUrl: './password-input.html',
  styleUrl: './password-input.css',
})
export class PasswordInput extends Input<string> {}
