import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { WorkflowService } from '../../core/workflow.service';

import { Project } from '../../common/project';
import { User } from '../../common/user';

const PROCEDURE = {
  '7982302615a72852c915309038918837': 1,  // 生产经营部新建
  '6846831325a7285cc7818a5005400886': 2,  // 检验部门审核项目
  '2803881535a7285f4734977045032333': 3   // 领导批准
};

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
