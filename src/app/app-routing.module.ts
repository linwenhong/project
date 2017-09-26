import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AComponent } from './a.component';
import { BComponent } from './b.component';

const routes: Routes = [
  { path: '', redirectTo: '/a', pathMatch: 'full' },
  { path: 'a', component: AComponent },
  { path: 'b/:id', component: BComponent },
  { path: 'home', loadChildren:'app/home/home.module#HomeModule' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}