import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WorkflowService } from '../../core/workflow.service';
import { WORKFLOW_TYPES } from '../../common/workflow-types';

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
  types: Object[] = [];

  constructor(
    private workflowService: WorkflowService,
    private router: Router
  ) { }

  ngOnInit() {
    for (const key in WORKFLOW_TYPES) {
      this.types.push(WORKFLOW_TYPES[key]);
    }
    sessionStorage.removeItem('queryParams');
    sessionStorage.removeItem('leader');
    this.listType = 1;
    this.getWorkflows(this.listType, this.type);
  }

  selectListType(type: number): void {
    if (type === this.listType) return;
    if (this.isLoad) {
      muiToast('数据加载中,请勿频繁操作!');
      return;
    }
    this.listType = type;
    this.workflows = [];
    this.type = 0;
    this.page = 1;
    this.canMore = true;
    this.getWorkflows(this.listType, this.type);
  }

  select_type(type: number): void {
    this.workflows = [];
    this.page = 1;
    this.canMore = true;
    this.getWorkflows(this.listType, type);
  }

  getWorkflows(listType: number, type: number): void {
    if (this.isLoad) return;
    this.isLoad = true;
    this.alert = '加载中...';
    this.workflowService.getWorkflows(listType, type, this.page).then( workflows => {
      this.isLoad = false;
      if (workflows) {
        if (workflows.length < 10) this.canMore = false;
        if (!this.workflows) {
          this.workflows = workflows;
        } else {
          for (const workflow of workflows) {
            this.workflows.push(workflow);
          }
        }
        if (this.workflows.length == 0) this.alert = '暂无数据';
      } else {
        this.canMore = false
        this.alert = '暂无数据';
      }
    });
  }

  detail(workflow: any): void {
    const url_ = (this.listType == 1) ? '-case/' : '-detail/';
    const url = WORKFLOW_TYPES[workflow.pro_uid].router + url_;
    this.router.navigate(['/home/' + url + workflow.app_uid]);
  }

  more(): void {
    if (this.isLoad) return;
    this.page++;
    this.getWorkflows(this.listType, this.type);
  }

  search(text: string) {
    console.log(text);
  }
}
