import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import { AuthGuard } from '../auth-guard.service';

import {HomeComponent} from "./home/home.component";
import {DComponent} from "./d/d.component";
const routes: Routes=[
	{
		path: '', component: HomeComponent, canActivate: [AuthGuard],
	    children: [
	      { path: 'd',  component: DComponent, canActivate: [AuthGuard] }
	    ]
	}
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule],
  providers:[]

})
export class HomeRoutingModule{}