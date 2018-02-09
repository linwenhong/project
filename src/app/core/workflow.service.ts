import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from './service-base.service';

@Injectable()
export class WorkflowService extends ServiceBaseService<any> {

  getWorkflows(listType: number, type: number): Promise<any[]> {
    const request = {
      type: listType
    };
    if (type != null) {
      request['case_type'] = type;
    }
    return this.getAll('cases', request);
  }

  createWorkflow(Workflow: Object = {}): void {
    super.post('case', Workflow);
  }

  getDetail(wf_id: any): Promise<any> {
    return super.get('case/info', { caseId: wf_id });
  }

  examine(request: Object = {}): Promise<any> {
    return super.post('check', request);
  }
}
