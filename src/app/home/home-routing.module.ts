import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Test2Component } from './test2/test2.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  { path: '', component: CreateProjectComponent },
  { path: 'sign', component: Test2Component },
  { path: 'create-project', component: CreateProjectComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'project/:id', component: ProjectComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class HomeRoutingModule {}
