import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { WorkflowService } from '../../core/workflow.service';

import { Project } from '../../common/project';
import { User } from '../../common/user';

const PROCEDURE = {
  '9018569255a5712da9fd527013808617': 1,  // 报告编制
  '3762426815a571302aa5736016931631': 2,  // 报告校验
  '1546753245a571352a35d67021131808': 3,  // 报告审核
  '3404235605a5713caa59782069577955': 4   // 报告批准
};

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-case.component.html',
  styleUrls: ['../../../assets/form.css']
})
export class ReportDetailComponent implements OnInit {
  isDetails: boolean = true;
  procedureIndex: number;
  app_uid: number;
  project: any;
  workflow: any;

  constructor(
    private workflowService: WorkflowService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: Http
  ) { }

  ngOnInit() {
    this.app_uid = this.activatedRoute.snapshot.params['id'];
    this.workflowService.getDetail(this.app_uid).then( workflow => {
      if (workflow.cases.current_task.length == 0) {
        this.procedureIndex = 10;
      } else {
        this.procedureIndex = PROCEDURE[workflow.cases.current_task[0].tas_uid];
      }
      this.project = workflow.data;
      this.workflow = workflow;
    });
  }
}

