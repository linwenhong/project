import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.id = queryParams.id;
      this.option = queryParams.option === 'true' ? true : false;
      console.log(this.id, this.option);
      this.optionTest = this.option ? '同意' : '拒绝';

      this.projects = JSON.parse(localStorage.getItem('projects'));
      for (const project of this.projects) {
        if (project.id === Number(this.id)) {
          this.project = project;
          break;
        }
      }
    });
  }

  options(option: boolean): void {
    if (option) {
      const progress_index = this.project.progress_index;
      this.editProject(option, progress_index);
      this.router.navigate(['/home/projects']);
      return;
    }
    this.router.navigate(['/home/project/' + this.id]);
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
