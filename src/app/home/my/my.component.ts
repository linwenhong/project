import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { User } from '../../common/user';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css', '../../../assets/form.css']
})
export class MyComponent implements OnInit {
  user: User;
  isShowSignature: boolean;

  constructor(
    private router: Router,
    private http: Http
  ) { }

  ngOnInit() {
    this.isShowSignature = false;
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  showSignature(): void {
    this.isShowSignature = !this.isShowSignature;
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
