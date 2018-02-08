import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { WorkflowService } from '../../core/workflow.service';

import { Project } from '../../common/project';
import { User } from '../../common/user';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['../../../assets/form.css']
})
export class CreateReportComponent implements OnInit {
  projectId: number;
  project: any;

  constructor(
    private workflowService: WorkflowService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: Http
  ) { }

  ngOnInit() {
    this.projectId = this.activatedRoute.snapshot.params['id'];
    console.log(this.projectId);
    this.workflowService.getDetail(this.projectId).then( workflow => {
      this.project = workflow.data;
      console.log(workflow.data);
    });
  }

  options(option: boolean): void {
    this.router.navigate(['/home/approval'], {
      queryParams: {
        id: this.projectId,
        option: option
      }
    });
  }
}

