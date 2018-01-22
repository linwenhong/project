import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../../common/user';
import { Project } from '../../common/project';
import { Report } from '../../common/report';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  selectedUser: User;
  editForm: Project | Report;
  editFormName: string;
  editUserKey: string;
  url: string;

  constructor(
    private http: Http,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.editFormName = queryParams.editFormName;
      this.editUserKey = queryParams.editUserKey;
      this.url = queryParams.url;
    });
  }

  ngOnInit() {
    this.editForm = JSON.parse(sessionStorage.getItem(this.editFormName));
    this.http.get('assets/json/users.json').toPromise().then(response => {
      this.users = response.json();
    });
  }

  selected(user: User): void {
    this.selectedUser = user;
  }

  options(option: boolean): void {
    if (option) {
      if (!this.selectedUser) {
        muiToast('请先选择用户');
        return;
      }
      this.editForm[this.editUserKey] = this.selectedUser.id;
      sessionStorage.setItem(this.editFormName, JSON.stringify(this.editForm));
    }
    this.router.navigate([this.url]);
  }
}
