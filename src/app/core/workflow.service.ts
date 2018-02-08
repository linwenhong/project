import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from './service-base.service';

@Injectable()
export class WorkflowService extends ServiceBaseService<any> {

  getWorkflows(listType: number, type: number): Promise<any[]> {
    return this.getAll('cases', { type: listType, a: type });
  }

  createWorkflow(Workflow: Object = {}): void {
    super.post('case', Workflow);
  }

  getDetail(wf_id: any): Promise<any> {
    return super.get('case/info', { caseId: wf_id });
  }
}
