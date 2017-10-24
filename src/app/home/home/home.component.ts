import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public username: any;
	public nav_select: number = 1;
	
  constructor(public authService: AuthService) {
		this.username = localStorage.getItem('username');
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
  }
	
	select(index: number): void{
		this.nav_select = index;
	}
}
