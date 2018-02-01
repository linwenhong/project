import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from './service-base.service';

import { User } from '../common/user';

@Injectable()
export class UserService extends ServiceBaseService<User>  {

  getUser(): void {
    super.get('123');
  }

  editName(user: any): void {
    const url = 'update_user_info?user_id=' + super.getCodeUserId() + '&name=' + user.name;
    super.put(url, {}).then(res => {
      localStorage.setItem('user', JSON.stringify(res.user));
    });
  }

}
