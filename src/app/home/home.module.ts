import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home/home.component';
import { Test2Component } from './test2/test2.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';
import { UserListComponent } from './user-list/user-list.component';
import { ApprovalComponent } from './approval/approval.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { CreateReportComponent } from './create-report/create-report.component';
import { CreateWorkflowComponent } from './create-workflow/create-workflow.component';
import { MyComponent } from './my/my.component';
import { MyEditComponent } from './my-edit/my-edit.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { SelectWorkflowTypeComponent } from './select-workflow-type/select-workflow-type.component';
import { DepartmentComponent } from './department/department.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    Test2Component,
    CreateProjectComponent,
    ProjectsComponent,
    ProjectComponent,
    UserListComponent,
    ApprovalComponent,
    ProjectDetailComponent,
    CreateReportComponent,
    CreateWorkflowComponent,
    MyComponent,
    MyEditComponent,
    ProjectListComponent,
    SelectWorkflowTypeComponent,
    DepartmentComponent,
  ]
})
export class HomeModule { }
