import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { User } from '../../common/user';
import { Project } from '../../common/project';

@Component({
  selector: 'shengxiang-user-select',
  templateUrl: './user-select.html',
  styleUrls: ['./user-select.css']
})
export class UserSelectComponent implements OnInit {
  @Input() text: string;
  @Input() userId: number;
  @Input() projectForm: Project;
  @Input() key: string;
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
    sessionStorage.setItem('projectForm', JSON.stringify(this.projectForm));
    this.router.navigate(['/home/user-list'], {
      queryParams: {
        editUserKey: this.key
      }
    });
  }

  getUser(id: number): User {
    for (const user of this.users) {
      if (user.id == id) {
        return user;
      }
    }
  }
}

