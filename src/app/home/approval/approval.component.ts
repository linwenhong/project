import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { WorkflowService } from '../../core/workflow.service';
import { ArrayUtil } from '../../core/util/array.util';
import { Project } from '../../common/project';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {
  id: number;
  option: boolean;
  optionTest: string;
  remake: string;
  project: Project;
  projects: Project[];
  url: string;
  request: any = {};
  leader: Object;
  queryParams: Object;

  constructor(
    private workflowService: WorkflowService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.leader = JSON.parse(sessionStorage.getItem('leader')) || {};
    console.log(this.leader);
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams;
      console.log(this.queryParams);
      this.id = queryParams['id'];
      this.url = queryParams['url'];
      this.option = queryParams['option'] === 'true' ? true : false;
      this.optionTest = this.option ? '同意' : '拒绝';
      this.request = {
        type: queryParams['type'],
        index: queryParams['index'],
        caseId: queryParams['id'],
        agree: this.option
      };
    });
  }

  options(option: boolean): void {
    if (option) {
      console.log(this.leader);
      if (!this.leader['leader'] || this.leader['leader'].length == 0) {
        muiToast('请选择下一步审核人');
        return;
      }
      this.request['leader'] = ArrayUtil.getWfId(JSON.parse(sessionStorage.getItem('Form')).leader);
      this.workflowService.examine(this.request).then(() => {
        this.router.navigate(['/home/project-list']);
      });
    } else {
      this.router.navigate([this.url]);
    }
  }
}
