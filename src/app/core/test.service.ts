import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from './service-base.service';

@Injectable()
export class TestService extends ServiceBaseService<any> {


  post(request: object): Promise<any>  {
    return super.post(request);
  }
}
