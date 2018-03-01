import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WorkflowService } from '../../core/workflow.service';

const REPORT = 1;     // 报告
const CONTRACT = 2;   // 合同
const PROJECT = 3;    // 项目
const WORKFLOW_TYPES = {
  '5651692255a57123952f3a8069340993': REPORT,
  '7665033775a6fd495c3cd53059547661': CONTRACT,
  '1577389215a72847d7f6a21005167802': PROJECT
};

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
        this.alert = '暂无数据';
      }
    });
  }

  detail(workflow: any): void {
    let url;
    const url_ = (this.listType == 1) ? 'case/' : 'detail/';
    switch (WORKFLOW_TYPES[workflow.pro_uid]) {
      case REPORT:
        url = 'report-' + url_;
        break;
      case CONTRACT:
        url = 'contract-' + url_;
        break;
      case PROJECT:
        url = 'project-' + url_;
        break;
    }
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
