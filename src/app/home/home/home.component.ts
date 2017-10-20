import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public username: any;
	
  constructor(public authService: AuthService) {
		this.username = localStorage.getItem('username');
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
  }

}
