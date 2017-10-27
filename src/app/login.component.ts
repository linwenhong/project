import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { FormsModule }          from '@angular/forms';
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
  	if(!user || !pwd){
  		notify('error','用户名和密码不能为空','请输入正确的用户名和密码!');
  		return;
  	}
  	this.http.post(environment.api_url+'bk_login',{
  				username: user,
  				password: pwd
  			})
        .toPromise().then(
          response => {
            let regions = response.json();
            if(regions.code==200){
            	sessionStorage.setItem('token', response.headers.get('Authorization'));
            	sessionStorage.setItem('isLogin', 'true');
            	sessionStorage.setItem('user', JSON.stringify(regions.user));
            	sessionStorage.setItem('token', regions.token);
            	localStorage.setItem('username', user);
            	localStorage.setItem('shopId', regions.shop_id);
            	this.router.navigate(['/home']);
            }else{
            	notify('error','登录失败','请输入正确的用户名和密码!');
            }
          });
  }
}