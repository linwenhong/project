import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { User } from '../../common/user';

@Component({
  selector: 'shengxiang-user-select',
  templateUrl: './user-select.html',
  styleUrls: ['./user-select.css']
})
export class UserSelectComponent implements OnInit {
  @Input() text: string;
  @Input() userId: number;
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
    this.router.navigate(['//home/user-list']);
  }

  getUser(id: number): User {
    for (const user of this.users) {
      if (user.id == id) {
        return user;
      }
    }
  }
}

