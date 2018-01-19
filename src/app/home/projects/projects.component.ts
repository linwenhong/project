import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Project } from '../../common/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[];

  constructor(
    private http: Http
  ) { }

  ngOnInit() {
    this.http.get('assets/json/projects.json').toPromise().then(projects => this.projects = projects.json());
  }

}
