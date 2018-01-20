import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { Project } from '../../common/project';
import { User } from '../../common/user';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css', '../create-project/create-project.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  userList: User[];
  projectId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: Http,
  ) { }

  ngOnInit() {
    this.projectId = this.activatedRoute.snapshot.params['id'];
    this.http.get('assets/json/users.json').toPromise().then(users => {
      this.userList = users.json();

      this.http.get('assets/json/projects.json').toPromise().then(projects => {
        // for (const project of projects.json()) {
        for (const project of JSON.parse(localStorage.getItem('projects'))) {
          if (project.id === Number(this.projectId)) {
            this.project = project;
            console.log(this.project);
            return;
          }
        }
      });
    });
  }

  getUserName(id: number): string {
    for (const user of this.userList) {
      if (user.id === Number(id)) {
        return user.name;
      }
    }
  }

}
