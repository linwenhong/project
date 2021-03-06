import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../core/user.service';
import { User } from '../../common/user';
import { Project } from '../../common/project';
import { Report } from '../../common/report';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  canMultiselect: boolean;
  users: User[];
  editForm: Project | Report;
  editFormName: string;
  editUserKey: string;
  url: string;
  queryParams: any;
  indexs: boolean[] = [];

  constructor(
    private http: Http,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams;
      this.canMultiselect = queryParams.canMultiselect === 'false' ? false : true;
      this.editFormName = queryParams.editFormName;
      this.editUserKey = queryParams.editUserKey;
      this.url = queryParams.url;
      this.editForm = JSON.parse(sessionStorage.getItem(this.editFormName));

      this.userService.getUsers(queryParams.department_id).then(users => {
        this.users = users;
        if (this.canMultiselect && this.editForm[this.editUserKey]) {
          for (const user of this.editForm[this.editUserKey]) {
            for (const index in this.users) {
              if (this.users[index].id === user.id) {
                this.indexs[index] = true;
                break;
              }
            }
          }
        }
      });
    });
  }

  selected(index: number): void {
    if (this.canMultiselect) {
      this.indexs[index] =  !this.indexs[index];
    } else {
      this.indexs = [];
      this.indexs[index] = true;
    }
  }

  options(option: boolean): void {
    if (option) {
      let users;
      if (this.canMultiselect) {
        users = this.editForm[this.editUserKey] ? this.editForm[this.editUserKey] : [];
      } else {
        users = [];
      }

      let isSelected = false;
      for (const i in this.indexs) {
        if (this.editForm[this.editUserKey]) {
          for (const key in this.editForm[this.editUserKey]) {
            if (this.editForm[this.editUserKey][key].id === this.users[i].id) {
              this.editForm[this.editUserKey].splice(key, 1);
              break;
            }
          }
        }
        if (this.indexs[i]) {
          isSelected = true;
          users.push({
            id: this.users[i].id,
            name: this.users[i].name,
            avatar: this.users[i].avatar,
            wf_usr_id: this.users[i].wf_usr_id,
          });
        }
      }
      if (!isSelected) {
        muiToast('请先选择用户');
        return;
      }
      this.editForm[this.editUserKey] = users;
      sessionStorage.setItem(this.editFormName, JSON.stringify(this.editForm));
    }
    let params = {};
    if (sessionStorage.getItem('queryParams')) {
      params = JSON.parse(sessionStorage.getItem('queryParams'));
    } else {
      params['type'] = this.queryParams.type;
    }
    this.router.navigate([this.url], {
      queryParams: params
    });
  }
}
