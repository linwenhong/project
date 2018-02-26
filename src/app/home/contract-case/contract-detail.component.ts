import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { WorkflowService } from '../../core/workflow.service';

import { Project } from '../../common/project';
import { User } from '../../common/user';

const PROCEDURE = {
  '4373963965a6fd9e6de3409040853830': 1,  // 生产经营部新建
  '7096257625a6fd9e6e327b7056575944': 2,  // 生产经营部合同核查
  '7591958415a6fda5eb32403071634539': 3,  // 检测部门经理详审
  '6555548895a7040fb4fa738001673444': 4,  // 副总经理详审核
  '2960155625a7131c20ab279093375177': 5,  // 总经理审核
  '6965696805a7131ea0dfde4035064095': 6   // 董事长批准
};

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-case.component.html',
  styleUrls: ['../../../assets/form.css']
})
export class ContractDetailComponent implements OnInit {
  isDetails: boolean = true;
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
}

