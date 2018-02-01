import { ModuleWithProviders, NgModule, Optional, SkipSelf  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { TestService } from './test.service';
import { UserService } from './user.service';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    NgbModule.forRoot(),
  ],
  declarations: [],
  providers: [
    TestService,
    UserService,
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
