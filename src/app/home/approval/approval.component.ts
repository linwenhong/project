import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { WorkflowService } from '../../core/workflow.service';
import { ArrayUtil } from '../../core/util/array.util';
import { Project } from '../../common/project';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {
  id: number;
  option: boolean;
  optionTest: string;
  remake: string;
  project: Project;
  projects: Project[];
  url: string;
  request: any = {};

  constructor(
    private workflowService: WorkflowService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const workflow = JSON.parse(sessionStorage.getItem('Form'));
    console.log(workflow);
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.id = queryParams['id'];
      this.url = queryParams['url'];
      this.option = queryParams['option'] === 'true' ? true : false;
      this.optionTest = this.option ? '同意' : '拒绝';
      this.request = {
        type: queryParams['type'],
        index: queryParams['index'],
        caseId: queryParams['id'],
        agree: this.option
      };
    });
  }

  options(option: boolean): void {
    if (option) {
      this.request['leader'] = ArrayUtil.getWfId(JSON.parse(sessionStorage.getItem('Form')).leader);
      this.workflowService.examine(this.request);
      this.router.navigate(['/home/project-list']);
      return;
    }
    this.router.navigate([this.url]);
  }

  editProject(option: boolean, progress_index: number): void {
    switch (progress_index) {
      case 1:
        this.project.is_person_in_charge_pass = this.option;
        this.project.person_in_charge_pass_remake = this.remake;
        break;
      case 2:
        this.project.is_manager_pass = this.option;
        this.project.manager_pass_remake = this.remake;
        break;
      default:
        console.log('default');
    }
    for (let project of this.projects) {
      if (project.id === Number(this.id)) {
        project = this.project;
        project.progress_index = this.option ? ++ progress_index : 1;
        break;
      }
    }
    console.log(this.projects);
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }
}
