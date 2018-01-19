import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserSelectComponent } from './user-select/user-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserSelectComponent,
  ],
  exports: [
    UserSelectComponent,
  ]
})
export class SharedModule { }
