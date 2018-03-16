import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { Test2Component } from './test2/test2.component';
import { UserListComponent } from './user-list/user-list.component';
import { ApprovalComponent } from './approval/approval.component';
import { CreateWorkflowComponent } from './create-workflow/create-workflow.component';
import { MyComponent } from './my/my.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { SelectWorkflowTypeComponent } from './select-workflow-type/select-workflow-type.component';
import { DepartmentComponent } from './department/department.component';
import { EditNameComponent } from './edit-name/edit-name.component';
import { EditPasswrodComponent } from './edit-passwrod/edit-passwrod.component';

import { ReportCaseComponent } from './report-case/report-case.component';
import { ReportDetailComponent } from './report-case/report-detail.component';
import { ContractCaseComponent } from './contract-case/contract-case.component';
import { ContractDetailComponent } from './contract-case/contract-detail.component';
import { ProjectCaseComponent } from './project-case/project-case.component';
import { ProjectDetailComponent } from './project-case/project-detail.component';
import { WorkflowCaseComponent } from './workflow-case/workflow-case.component';
import { WorkflowCaseDetailComponent } from './workflow-case/workflow-case-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign', component: Test2Component },
  { path: 'user-list', component: UserListComponent },
  { path: 'approval', component: ApprovalComponent },
  { path: 'create-workflow', component: CreateWorkflowComponent },
  { path: 'my', component: MyComponent },
  { path: 'project-list', component: ProjectListComponent },
  { path: 'select-workflow-type', component: SelectWorkflowTypeComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'edit-name', component: EditNameComponent },
  { path: 'edit-password', component: EditPasswrodComponent },

  { path: 'report-case/:id', component: ReportCaseComponent },
  { path: 'report-detail/:id', component: ReportDetailComponent },
  { path: 'contract-case/:id', component: ContractCaseComponent },
  { path: 'contract-detail/:id', component: ContractDetailComponent },
  { path: 'project-case/:id', component: ProjectCaseComponent },
  { path: 'project-detail/:id', component: ProjectDetailComponent },
  { path: 'workflow-case/:id', component: WorkflowCaseComponent },
  { path: 'workflow-detail/:id', component: WorkflowCaseDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class HomeRoutingModule {}
