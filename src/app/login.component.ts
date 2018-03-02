import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username: string;
  public password: string;

  constructor(public router: Router, private http: Http) {
    this.username = localStorage.getItem('username') || null;
  }

  login(user, pwd) {
    if (!user || !pwd) {
      muiToast('用户名和密码不能为空');
      return;
    }
    this.http.post(environment.api_url + 'get_user_info', {
        username: user,
        password: pwd
      })
      .toPromise().then(
      response => {
        const regions = response.json();
        if (regions.status === '500') {
          muiToast('用户名或密码错误');
        } else {
          localStorage.setItem('isLogin', 'true')
          localStorage.setItem('token', regions.token);
          localStorage.setItem('user', JSON.stringify(regions));
          this.router.navigate(['/home']);
        }
      })
      .catch(() => muiToast('error'));
  }
}
