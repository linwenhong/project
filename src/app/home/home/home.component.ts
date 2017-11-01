import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { HomeService } from '../home.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public username: any;
	public nav_select: string;
	login_pwd: string;
	
  constructor(public router: Router, private service: HomeService) {
		this.username = localStorage.getItem('username');
  }

  logout() {
  	sessionStorage.clear();
  }

  ngOnInit() {
  	this.nav_select = sessionStorage.getItem('nav_select') || '1';
  	if(!sessionStorage.getItem('isLogin')) this.router.navigate(['/login']);
  }
	
	select(index: string): void {
		this.nav_select = index;
		sessionStorage.setItem('nav_select', index)
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
