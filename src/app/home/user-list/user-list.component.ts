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
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams;
      this.canMultiselect = queryParams.canMultiselect === 'false' ? false : true;
      this.editFormName = queryParams.editFormName;
      this.editUserKey = queryParams.editUserKey;
      this.url = queryParams.url;
    });
  }

  ngOnInit() {
    this.editForm = JSON.parse(sessionStorage.getItem(this.editFormName));
    this.http.get('assets/json/users.json').toPromise().then(response => {
      this.users = response.json();
      if (this.canMultiselect && this.editForm[this.editUserKey]) {
        for (const id of this.editForm[this.editUserKey]) {
          for (const index in this.users) {
            if (this.users[index].id === id) {
              this.indexs[index] = true;
              break;
            }
          }
        }
      }
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
      const ids = [];
      let isSelected = false;
      for (const i in this.indexs) {
        if (this.indexs[i]) {
          isSelected = true;
          ids.push(this.users[i].id);
        }
      }
      if (!isSelected) {
        muiToast('请先选择用户');
        return;
      }
      this.editForm[this.editUserKey] = ids;
      // ids.sort(function(a, b){
      //   return a > b ? 1 : -1;
      // });
      sessionStorage.setItem(this.editFormName, JSON.stringify(this.editForm));
    }
    this.router.navigate([this.url], {
      queryParams: this.queryParams
    });
  }
}
