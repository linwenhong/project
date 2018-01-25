import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserSelectComponent } from './user-select/user-select';
import { PageHeaderComponent } from './page-header/page-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserSelectComponent,
    PageHeaderComponent,
  ],
  exports: [
    UserSelectComponent,
    PageHeaderComponent
  ]
})
export class SharedModule { }
