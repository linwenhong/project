import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../common/user';
import { Project } from '../../common/project';
import { Report } from '../../common/report';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.html',
  styleUrls: ['./user-select.css']
})
export class UserSelectComponent implements OnInit {
  @Input() canMultiselect: boolean;
  @Input() text: string;
  @Input() editForm: any;
  @Input() editFormName: string = 'projectForm';
  @Input() key: string;
  @Input() canEditUser: boolean = true;
  @Input() url: string;
  @Input() queryParams: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }

  toSelectUser(): void {
    sessionStorage.setItem(this.editFormName, JSON.stringify(this.editForm));
    const params = {
      canMultiselect: this.canMultiselect,
      editFormName: this.editFormName,
      editUserKey: this.key,
      url: this.url
    };

    for (const key in this.queryParams) {
      params[key] = this.queryParams[key];
    }
    this.router.navigate(['/home/department'], {
      queryParams: params
    });
  }

  removeUser(index: number): void {
    if (!this.canEditUser) {
      return;
    }
    this.editForm[this.key].splice(index, 1);
  }
}

