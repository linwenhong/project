import { Component, OnInit } from '@angular/core';

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
    private workflowService: WorkflowService
  ) { }

  ngOnInit() {
    this.listType = 1;
    this.getWorkflows(this.listType, this.type);
  }

  selectListType(type: number): void {
    if (type === this.listType) {
      return;
    }
    this.listType = type;
    this.getWorkflows(this.listType, this.type);
  }

  getWorkflows(listType: number, type: number): void {
    this.workflowService.getWorkflows(listType, type).then( workflows => {
        this.workflows = workflows;
      }
    );
  }
}
