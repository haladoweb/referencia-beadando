import { Component, input } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';

@Component({ template: '' })
export abstract class Input<T> {
  field = input.required<FieldTree<T>>();
  label = input.required<string>();
}
