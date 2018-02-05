import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from './service-base.service';
import { File } from '../common/file';

@Injectable()
export class FileService extends ServiceBaseService<File>  {

  getReports(): Promise<File[]> {
    return super.getAll('get_report_list').then(reports => {
      return reports;
    });
  }

  getContracts(): Promise<File[]> {
    return super.getAll('get_contract_list').then(contracts => {
      return contracts;
    });
  }

  getProjects(): Promise<File[]> {
    return super.getAll('get_projects_list').then(projects => {
      return projects;
    });
  }
}
