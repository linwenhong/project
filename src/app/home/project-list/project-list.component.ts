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
  type: number = 0;
  workflows: any[];
  page: number = 1;
  searchText: string = '';
  canMore: boolean = true;
  alert: string = '加载中...';
  isLoad: boolean = false;

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
    this.type = 0;
    this.listType = type;
    this.workflows = [];
    this.page = 1;
    this.canMore = true;
    this.getWorkflows(this.listType, this.type);
  }

  select_type(type: number): void {
    this.getWorkflows(this.listType, type);
  }

  getWorkflows(listType: number, type: number): void {
    this.workflowService.getWorkflows(listType, type, this.page).then( workflows => {
      this.isLoad = false;
      if (workflows.length < 10) this.canMore = false;
        if (!this.workflows) {
          this.workflows = workflows;
        } else {
          for (const workflow of workflows) {
            this.workflows.push(workflow);
          }
        }
        this.alert = this.workflows.length == 0 ? '暂无数据' : '加载中...';
      }
    );
  }

  detail(app_uid: string): void {
    this.router.navigate(['/home/create-report/' + app_uid]);
  }

  more(): void {
    this.isLoad = true;
    this.page++;
    this.getWorkflows(this.listType, this.type);
  }

  search(text: string) {
    console.log(text);
  }
}
