import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';

@Injectable()
export class HomeService {

  constructor(private http: Http) { }
  
  get(url: string): Promise<any> {
  	const header: Headers = new Headers();
  	header.append('Authorization', sessionStorage.getItem('token'));
    return this.http.get(environment.api_url+url, {headers: header})
                    .toPromise()
                    .then(
                      response => {
                      	console.log(response.headers.get('Access-Control-Allow-Origin'));
//                    	sessionStorage.setItem('token', )

                        let regions = response.json();
                        return regions;
                      });
  }
  
  post(url: string, request: any[]): Promise<any> {
  	const header: Headers = new Headers();
  	header.append('Authorization', sessionStorage.getItem('token'));
    return this.http.post(environment.api_url+url, request, {headers: header})
                    .toPromise().then(
                      response => {
                        let regions = response.json();
                        return regions;
                      });
  }

}
