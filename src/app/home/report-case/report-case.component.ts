import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { WorkflowService } from '../../core/workflow.service';

import { Project } from '../../common/project';
import { User } from '../../common/user';

@Component({
  selector: 'app-report-case',
  templateUrl: './report-case.component.html',
  styleUrls: ['../../../assets/form.css']
})
export class ReportCaseComponent implements OnInit {
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
        url: '/home/report-case/' + this.app_uid
      }
    });
  }
}

