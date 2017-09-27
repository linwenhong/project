import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { AppRoutingModule }  from './app-routing.module';
import { LoginRoutingModule }      from './login-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent }  from './login.component';
import { AComponent } from './a.component';
import { BComponent } from './b.component';

@NgModule({
  declarations: [
    AppComponent,
    AComponent,
    BComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
	 constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
