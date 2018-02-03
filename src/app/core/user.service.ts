import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from './service-base.service';
import { User } from '../common/user';

@Injectable()
export class UserService extends ServiceBaseService<User>  {

  getUser(): void {
    super.get('123');
  }

  editName(user: User): Promise<User> {
    const url = 'update_user_info';
    user['user_id'] = super.getCodeUserId();
    return super.post(url, user).then(response => {
      return response ? response : JSON.parse(localStorage.getItem('user'));
    });
  }

  editPassword(user: User): Promise<User> {
    const url = 'update_user_info';
    user['user_id'] = super.getCodeUserId();
    return super.post(url, user);
  }

}
