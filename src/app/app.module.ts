import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpModule } from '@angular/http';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';

import { AppRoutingModule }  from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent }  from './login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
  	NgbModule.forRoot(),
  	HttpModule,
  	CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
	 constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
