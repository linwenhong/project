import { Component, OnInit } from '@angular/core';
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public username: any;
	public nav_select: number = 1;
	
  constructor() {
		this.username = localStorage.getItem('username');
  }

  logout() {
  }

  ngOnInit() {
  }
	
	select(index: number): void{
		this.nav_select = index;
	}
}
