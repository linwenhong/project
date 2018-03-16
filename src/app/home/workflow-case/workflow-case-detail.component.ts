import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { WorkflowService } from '../../core/workflow.service';
import { TASK } from  '../../common/task';
import { CASE_FORM_DATA } from '../../common/case-form-data';

@Component({
  selector: 'app-workflow-case-detail',
  templateUrl: './workflow-case.component.html',
  styleUrls: ['../../../assets/form.css']
})
export class WorkflowCaseDetailComponent implements OnInit {
  isDetails: boolean = true;
  procedureIndex: number;
  app_uid: number;
  project: any;
  workflow: any;
  formKeys: Object;
  title: string;
  queryParams: Object;

  constructor(
    private workflowService: WorkflowService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: Http
  ) { }

  ngOnInit() {
    this.app_uid = this.activatedRoute.snapshot.params['id'];
    this.workflowService.getDetail(this.app_uid).then(workflow => {
      if (workflow.cases.app_status == 'COMPLETED') {
        this.procedureIndex = 10;
      } else {
        this.procedureIndex = TASK[workflow.type - 1][workflow.cases.current_task[0].tas_uid];
      }
      this.project = workflow.data;
      this.workflow = workflow;

      this.formKeys = CASE_FORM_DATA[workflow.type];
      switch (workflow.type) {
        case 1:
          this.title = '报告';
          break;
        case 2:
          this.title = '合同';
          break;
        case 3:
          this.title = '项目';
          break;
        case 4:
          this.title = '个人事务';
          break;
        case 5:
          this.title = '试验报告';
          break;
        case 6:
          this.title = '采购申请';
          break;
      }
    });
  }
}

