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
import { CreateWrokflowComponent } from './create-wrokflow/create-wrokflow.component';
import { MyComponent } from './my/my.component';

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
    CreateWrokflowComponent,
    MyComponent,
  ]
})
export class HomeModule { }
