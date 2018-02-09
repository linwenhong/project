import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WorkflowService } from '../../core/workflow.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  listType: number;
  type: number = null;
  workflows: any[];

  constructor(
    private workflowService: WorkflowService,
    private router: Router
  ) { }

  ngOnInit() {
    sessionStorage.removeItem('queryParams');
    sessionStorage.removeItem('leader');
    this.listType = 1;
    this.getWorkflows(this.listType, this.type);
  }

  selectListType(type: number): void {
    if (type === this.listType) {
      return;
    }
    this.type = null;
    this.listType = type;
    this.getWorkflows(this.listType, this.type);
  }

  select_type(type: number): void {
    this.getWorkflows(this.listType, type);
  }

  getWorkflows(listType: number, type: number): void {
    this.workflowService.getWorkflows(listType, type).then( workflows => {
        this.workflows = workflows;
      }
    );
  }

  detail(app_uid: string): void {
    this.router.navigate(['/home/create-report/' + app_uid]);
  }
}
