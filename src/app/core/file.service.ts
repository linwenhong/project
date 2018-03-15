import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from './service-base.service';
import { File } from '../common/file';

@Injectable()
export class FileService extends ServiceBaseService<File>  {

  getList(type: number): Promise<File[]> {
    return super.getAll('get_list', { type: type }).then(fileList => {
      return fileList;
    });
  }
}
