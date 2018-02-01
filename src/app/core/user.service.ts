import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from './service-base.service';

@Injectable()
export class UserService extends ServiceBaseService<any>  {

  getUser(): void {
    super.get('123');
  }

  editName(): void {
    super.put('test');
  }

}
