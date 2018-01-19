import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { Project } from '../../common/project';
import { User } from '../../common/user';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css', '../create-project/create-project.component.css']
})
export class ProjectComponent implements OnInit {
  project: Project;
  userList: User[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: Http,
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.http.get('assets/json/users.json').toPromise().then(users => {
      this.userList = users.json();

      this.http.get('assets/json/projects.json').toPromise().then(projects => {
        for (const project of projects.json()) {
          if (project.id == id) {
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
      if (user.id == id) {
        return user.name;
      }
    }
  }
}
