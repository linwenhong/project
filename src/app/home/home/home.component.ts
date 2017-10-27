import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public username: any;
	public nav_select: string;
	
  constructor(public router: Router) {
		this.username = localStorage.getItem('username');
  }

  logout() {
  	sessionStorage.clear();
  }

  ngOnInit() {
  	this.nav_select = sessionStorage.getItem('nav_select') || '1';
  	if(!sessionStorage.getItem('isLogin')) this.router.navigate(['/login']);
  }
	
	select(index: string): void{
		this.nav_select = index;
		sessionStorage.setItem('nav_select', index)
	}
}
