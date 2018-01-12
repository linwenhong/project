import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';

import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(router: Router) {
//  console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
