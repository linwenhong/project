import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {DComponent} from "./d/d.component";
import {HomeRoutingModule} from "./home-routing.module";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent, DComponent]
})
export class HomeModule { }
