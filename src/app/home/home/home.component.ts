import { Component, OnInit } from '@angular/core';
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public username: any;
	public nav_select: string;
	
  constructor() {
		this.username = localStorage.getItem('username');
  }

  logout() {
  }

  ngOnInit() {
  	this.nav_select = sessionStorage.getItem('nav_select') || '1';
  }
	
	select(index: string): void{
		this.nav_select = index;
		sessionStorage.setItem('nav_select', index)
	}
}
