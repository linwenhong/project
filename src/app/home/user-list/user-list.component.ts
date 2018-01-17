import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { User } from '../../common/user';
import { Project } from '../../common/project';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  selectedUser: User;
  projectForm: Project;
  editUserKey: string;

  constructor(
    private http: Http,
    private router: Router,
  ) { }

  ngOnInit() {
    this.editUserKey = 'author';
    this.projectForm = JSON.parse(sessionStorage.getItem('projectForm'));
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
        notify('error', '未选择用户', '请先选择用户');
        return;
      }
      this.projectForm[this.editUserKey] = this.selectedUser.id;
      sessionStorage.setItem('projectForm', JSON.stringify(this.projectForm));
    }
    this.router.navigate(['/home']);
  }
}
