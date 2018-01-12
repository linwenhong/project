import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from './service-base.service';

@Injectable()
export class TestService extends ServiceBaseService<any> {

  protected getApiUrl(): string {
    return 'contracts';
  }

  get(): Promise<any>  {
    return super.getAll();
  }
}
