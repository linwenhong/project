import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { WorkflowService } from '../../core/workflow.service';
import { PROJECT_TASK } from  '../../common/task';

const PROCEDURE = PROJECT_TASK;

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-case.component.html',
  styleUrls: ['../../../assets/form.css']
})
export class ProjectDetailComponent implements OnInit {
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
      if (workflow.cases.app_status == 'COMPLETED') {
        this.procedureIndex = 10;
      } else {
        this.procedureIndex = PROCEDURE[workflow.cases.current_task[0].tas_uid];
      }
      this.project = workflow.data;
      this.workflow = workflow;
    });
  }
}
