import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
} from '@angular/material';

import { InputAutocompleteComponent } from './input-autocomplete.component';

@NgModule({
  declarations: [InputAutocompleteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatIconModule,
  ],
  exports: [InputAutocompleteComponent],
})
export class InputAutocompleteModule {}
