import { ModuleWithProviders, NgModule, Optional, SkipSelf  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { UserService } from './user.service';
import { DepartmentService } from './department.service';
import { FileService } from './file.service';
import { WorkflowService } from './workflow.service';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    NgbModule.forRoot(),
  ],
  declarations: [],
  providers: [
    UserService,
    DepartmentService,
    FileService,
    WorkflowService,
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
