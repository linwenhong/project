import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from './service-base.service';
import { User } from '../common/user';

@Injectable()
export class UserService extends ServiceBaseService<User> {

  getUsers(department_id: string): Promise<User[]> {
    return super.getAll('get_user_list', { dp_id: department_id }).then(users => {
      return users;
    });
  }

  editName(user: User): Promise<User> {
    const url = 'update_user_info';
    user['user_id'] = super.getCodeUserId();
    return super.post(url, user).then(response => {
      return response ? response : null;
    });
  }

  editPassword(user: User): Promise<User> {
    const url = 'update_user_info';
    user['user_id'] = super.getCodeUserId();
    return super.post(url, user);
  }

}
