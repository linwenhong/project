import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { WorkflowService } from '../../core/workflow.service';
import { TEST_REPORT_TASK } from  '../../common/task';
import { CASE_FORM_DATA } from '../../common/case-form-data';

const PROCEDURE = TEST_REPORT_TASK;

@Component({
  selector: 'app-test-report-case',
  templateUrl: './test-report-case.component.html',
  styleUrls: ['../../../assets/form.css']
})
export class TestReportCaseComponent implements OnInit {
  isDetails: boolean = false;
  procedureIndex: number;
  app_uid: number;
  project: any;
  workflow: any;
  task: string;
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
    this.workflowService.getDetail(this.app_uid).then( workflow => {
      this.procedureIndex = PROCEDURE[workflow.cases.current_task[0].tas_uid];
      this.project = workflow.data;
      this.workflow = workflow;
      this.task = workflow.task;
      this.formKeys = CASE_FORM_DATA[workflow.type];
      this.queryParams = {
        id: this.app_uid,
        index: this.workflow.index,
        type: this.workflow.type,
        task: this.task
      };
      switch (workflow.type) {
        case 5:
          this.title = '试验报告详情';
          this.queryParams['url'] =  '/home/test-report-case/' + this.app_uid;
          break;
      }
    });
  }
}

