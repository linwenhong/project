import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Http } from '@angular/http';
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
  @Input() userId: number;
  @Input() editForm: Project | Report;
  @Input() editFormName: string = 'projectForm';
  @Input() key: string;
  @Input() canEditUser: boolean = true;
  @Input() url: string;
  // @Output() manualFiltered: EventEmitter<any> = new EventEmitter();

  users: User[];
  constructor(
    private http: Http,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.http.get('assets/json/users.json').toPromise().then(response => {
      this.users = response.json();
    });
  }

  toSelectUser(): void {
    sessionStorage.setItem(this.editFormName, JSON.stringify(this.editForm));
    this.router.navigate(['/home/user-list'], {
      queryParams: {
        canMultiselect: this.canMultiselect,
        editFormName: this.editFormName,
        editUserKey: this.key,
        url: this.url
      }
    });
  }

  getUser(id: number, key: string): User {
    for (const user of this.users) {
      if (user.id === Number(id)) {
        return user[key];
      }
    }
    return null;
  }

  removeUser(index: number): void {
    this.editForm[this.key].splice(index, 1);
  }
}

