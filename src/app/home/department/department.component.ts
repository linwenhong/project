import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DepartmentService } from '../../core/department.service';
import { Department } from '../../common/department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  url: string;
  departments: Department[];
  queryParams: any = {};
  returnParams: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private departmentService: DepartmentService,
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams;
      this.returnParams = queryParams['returnParams'];
      this.url = queryParams.url;
      console.log(queryParams);
    });
  }

  ngOnInit() {
    this.departmentService.getDepartments().then(departments => {
      this.departments = departments;
    });
  }

  selected(id: any): void {
    const params = {};
    for (const key in this.queryParams) {
      params[key] = this.queryParams[key];
    }
    params['department_id'] = id;
    this.router.navigate(['/home/user-list'], {
      queryParams: params
    });
  }
}
