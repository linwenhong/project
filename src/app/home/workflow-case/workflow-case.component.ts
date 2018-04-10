import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { WorkflowService } from '../../core/workflow.service';
import { TASK } from  '../../common/task';
import { CASE_FORM_DATA } from '../../common/case-form-data';

@Component({
  selector: 'app-workflow-case',
  templateUrl: './workflow-case.component.html',
  styleUrls: ['../../../assets/form.css']
})
export class WorkflowCaseComponent implements OnInit {
  isDetails: boolean = false;
  procedureIndex: number;
  app_uid: number;
  project: any;
  workflow: any;
  task: string;
  type: number;
  formKeys: Object;
  title: string;
  queryParams: Object;
  tableData: Object[];

  constructor(
    private workflowService: WorkflowService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: Http
  ) { }

  ngOnInit() {
    this.app_uid = this.activatedRoute.snapshot.params['id'];
    this.workflowService.getDetail(this.app_uid).then( workflow => {
      this.procedureIndex = TASK[workflow.type - 1][workflow.cases.current_task[0].tas_uid];
      console.log(this.procedureIndex);
      this.project = workflow.data;
      this.workflow = workflow;
      this.task = workflow.task;
      this.type = workflow.type;
      this.formKeys = CASE_FORM_DATA[workflow.type];
      this.queryParams = {
        id: this.app_uid,
        index: this.workflow.index,
        type: this.workflow.type,
        url: '/home/workflow-case/' + this.app_uid,
        task: this.task,
        cur_task: workflow.cur_task
      };
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

