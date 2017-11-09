import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { HomeService } from '../home.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public username: any;
	login_pwd: string;
	
  constructor(public router: Router, public service: HomeService) {
		this.username = localStorage.getItem('username');
  }

  logout() {
  	this.service.unCheck();
  	sessionStorage.clear();
  	this.router.navigate(['/login']);
  }

  ngOnInit() {
//	if(!sessionStorage.getItem('isLogin')) this.router.navigate(['/login']);
		localStorage.setItem('shopId', '2017101800077000000046039990');
  }
	
	getToken(): void {
		this.service.token(localStorage.getItem('username'), this.login_pwd).then(
			res => {
	     	if(res.code == '200'){
	     		this.login_pwd = '';
	     	}	
	    }
		);
	}
	
	unLogin(): void {
		document.getElementById('toLogin').style.display = "none";
	}
}
