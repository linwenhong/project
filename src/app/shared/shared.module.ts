import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserSelectComponent } from './user-select/user-select';
import { PageHeaderComponent } from './page-header/page-header.component';
import { ApprovalOptionsComponent } from './approval-options/approval-options.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserSelectComponent,
    PageHeaderComponent,
    ApprovalOptionsComponent
  ],
  exports: [
    UserSelectComponent,
    PageHeaderComponent,
    ApprovalOptionsComponent
  ]
})
export class SharedModule { }
