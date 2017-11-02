import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class HomeService {
	isLogin: boolean = false;
	nav_select: string = '1';
	time: number = 1;
	check: any;
	new_orders: any;
	
  constructor(private http: Http) { }
    
  toCheck(): void {
  	this.isLogin = true;
  	console.log('计时器开启', this.isLogin);
  	//计时器
		let that = this;
		this.check = setInterval(function() {
			console.log('计时', that.time, that.isLogin);
	    if(that.time < 5){
	      that.time++;
	    }else if(that.time){
	    	that.time = 1;
	   		that.checkNew();
	    }
		}, 1000);
  }
  unCheck(): void {
  	this.isLogin = false;
  	console.log('计时器关闭', this.isLogin);
  	clearInterval(this.check);
  }
  //验证是否存在新订单
  checkNew(): void {
  	this.http.post(environment.api_url+'bk_new_orders', {
  		shop_id: localStorage.getItem('shopId')
  	}).toPromise().then(
  		response => {
  			let res = response.json();
  			if(res.status == '200'){
	     		this.new_orders = res.orders.new_order;
	     		if(this.new_orders.length>0){
	     			notify('success', '订单检查', '您有新的订单!');
	     		}
	     	}else{
	     		notify('error', '错误', res.msg);
	     	};
  		}
		);
  }
 
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
