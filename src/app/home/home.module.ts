import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home/home.component';
import { Test2Component } from './test2/test2.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { UserListComponent } from './user-list/user-list.component';
import { ApprovalComponent } from './approval/approval.component';
import { ReportCaseComponent } from './report-case/report-case.component';
import { ContractCaseComponent } from './contract-case/contract-case.component';
import { ProjectCaseComponent } from './project-case/project-case.component';
import { CreateWorkflowComponent } from './create-workflow/create-workflow.component';
import { MyComponent } from './my/my.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { SelectWorkflowTypeComponent } from './select-workflow-type/select-workflow-type.component';
import { DepartmentComponent } from './department/department.component';
import { EditNameComponent } from './edit-name/edit-name.component';
import { EditPasswrodComponent } from './edit-passwrod/edit-passwrod.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    Test2Component,
    CreateProjectComponent,
    UserListComponent,
    ApprovalComponent,
    ReportCaseComponent,
    ContractCaseComponent,
    ProjectCaseComponent,
    CreateWorkflowComponent,
    MyComponent,
    ProjectListComponent,
    SelectWorkflowTypeComponent,
    DepartmentComponent,
    EditNameComponent,
    EditPasswrodComponent,
  ]
})
export class HomeModule { }
