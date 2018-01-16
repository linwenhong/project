import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { Test2Component } from './test2/test2.component';
import { CreateProjectComponent } from './create-project/create-project.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    Test2Component,
    CreateProjectComponent,
  ]
})
export class HomeModule { }
