import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class HomeService {
	public nav_select: string = '1';
  constructor(private http: Http) { }
  
  get(url: string): Promise<any> {
  	const header: Headers = new Headers();
  	header.append('Authorization', sessionStorage.getItem('token'));
    return this.http.get(environment.api_url+url, {headers: header})
                    .toPromise()
                    .then(
                      response => {
                      	sessionStorage.setItem('token', response.headers.get('Authorization'));
                        let regions = response.json();
                        if(regions.status == '401'){
									     		document.getElementById('toLogin').style.display = "block";
									     	}	
                        return regions;
                      });
  }
  
  post(url: string, request: any): Promise<any> {
  	const header: Headers = new Headers();
  	header.append('Authorization', sessionStorage.getItem('token'));
    return this.http.post(environment.api_url+url, request, {headers: header})
                    .toPromise().then(
                      response => {
                      	sessionStorage.setItem('token', response.headers.get('Authorization'));
                        let regions = response.json();
                        if(regions.status == '401'){
									     		document.getElementById('toLogin').style.display = "block";
									     	}	
                        return regions;
                      });
  }
  
  token(username: string, password: string): Promise<any> {
    return this.http.post(environment.api_url+'bk_login', {
											username: username,
											password: password
										})
                    .toPromise().then(
                      response => {
                      	sessionStorage.setItem('token', response.headers.get('Authorization'));
                        let regions = response.json();
                        if(regions.code == '200'){
                        	document.getElementById('toLogin').style.display = "none";
									     		sessionStorage.setItem('token', regions.token);
									     	}else{
									     		notify('error', '输入错误', '请输入正确的密码!');
									     	};
                        return regions;
                      });
  }

}
