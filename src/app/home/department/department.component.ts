import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

const departments = [
  { id: 654, name: '董事会' },
  { id: 894, name: '检验部' },
  { id: 876, name: '人事部' },
  { id: 879, name: '工程部' },
  { id: 865, name: '财务部' },
  { id: 648, name: '技术部' }
];

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  url: string;
  departments: any[];
  queryParams: any = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams;
      this.url = queryParams.url;
      console.log(queryParams);
    });
  }

  ngOnInit() {
    this.departments = departments;
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
