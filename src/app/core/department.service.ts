import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from './service-base.service';
import { Department } from '../common/department';

@Injectable()
export class DepartmentService extends ServiceBaseService<Department>  {

  getDepartments(): Promise<Department[]> {
    return super.getAll('get_department_list').then(departments => {
      return departments;
    });
  }
}
