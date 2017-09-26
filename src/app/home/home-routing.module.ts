import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {HomeComponent} from "./home/home.component";
import {DComponent} from "./d/d.component";
const routes: Routes=[
  {path:'', component:HomeComponent},
  {path:'d', component:DComponent}
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule],
  providers:[]

})
export class HomeRoutingModule{}