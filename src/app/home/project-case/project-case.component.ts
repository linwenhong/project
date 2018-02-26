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
  selector: 'app-project-case',
  templateUrl: './project-case.component.html',
  styleUrls: ['../../../assets/form.css']
})
export class ProjectCaseComponent implements OnInit {
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
      this.procedureIndex = PROCEDURE[workflow.cases.current_task[0].tas_uid];
      this.project = workflow.data;
      this.workflow = workflow;
    });
  }

  options(option: boolean): void {
    this.router.navigate(['/home/approval'], {
      queryParams: {
        id: this.app_uid,
        option: option,
        index: this.workflow.index,
        type: this.workflow.type,
        url: '/home/project-case/' + this.app_uid
      }
    });
  }
}
