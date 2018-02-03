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
    const url = 'update_user_info?user_id=' + super.getCodeUserId() + '&name=' + user.name;
    return super.put(url, {}).then(response => {
      return response ? response : JSON.parse(localStorage.getItem('user'));
    });
  }

}
