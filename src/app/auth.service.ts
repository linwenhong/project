import { Injectable } from '@angular/core';
import { Router }      from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';

import { environment } from '../environments/environment';

@Injectable()
export class AuthService {
	private isLogin: boolean = false;
	
	constructor( private http: Http, public router: Router) {
  }
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(username: string, password: string): Observable<boolean> {
		this.http.post(environment.api_url+'bk_login', {
				username: username,
				password: password
		  	}).toPromise().then(
		                    response => {
		                      let regions = response.json();
		                      if(regions.code == '200'){
		                      	sessionStorage.setItem('isLogin', 'true');
		                      	sessionStorage.setItem('user', JSON.stringify(regions.user));
		                      	sessionStorage.setItem('token', regions.token);
		                      	localStorage.setItem('username', username);
		                      	localStorage.setItem('shopId', regions.shop_id);
		                      	this.isLogin = true;
		                      }else{
		                      	alert('用户名或密码错误!');
		                      }
		                  });
  	return Observable.of(true).delay(1000).do(val => this.isLoggedIn = this.isLogin);
  }

  logout(): void {
  	sessionStorage.clear(); 
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
