import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';
import { TestService } from './core/test.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username: string;
  public password: string;

  constructor(public router: Router, private http: Http, private testService: TestService) {
    this.username = localStorage.getItem('username') || null;
  }

  login(user, pwd) {
    if (!user || !pwd) {
      muiToast('用户名和密码不能为空');
      return;
    }
    this.http.post(environment.api_url + 'bk_login', {
        username: user,
        password: pwd
      })
      .toPromise().then(
      response => {
        const regions = response.json();
        if (regions.code === '200') {
          this.router.navigate(['/home']);
        } else {
          muiToast('用户名或密码错误');
        }
      });
  }
}
