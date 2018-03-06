import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { WorkflowService } from '../../core/workflow.service';
import { PROJECT_TASK } from  '../../common/task';

const PROCEDURE = PROJECT_TASK;

@Component({
  selector: 'app-project-case',
  templateUrl: './project-case.component.html',
  styleUrls: ['../../../assets/form.css']
})
export class ProjectCaseComponent implements OnInit {
  isDetails: boolean = false;
  procedureIndex: number;
  app_uid: number;
  project: any;
  workflow: any;
  task: string;

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
    });
  }

  options(option: boolean): void {
    this.router.navigate(['/home/approval'], {
      queryParams: {
        id: this.app_uid,
        option: option,
        index: this.workflow.index,
        type: this.workflow.type,
        url: '/home/project-case/' + this.app_uid,
        task: this.task
      }
    });
  }
}
