import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', loadChildren:'app/home/home.module#HomeModule' },
//{ path: 'home', loadChildren:'app/home/home.module#HomeModule', canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: '/login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}