import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from './auth.service';
import { FormsModule }          from '@angular/forms';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
	public username: string;
	public password: string;
	
  constructor(public authService: AuthService, public router: Router) {
    this.authService.isLoggedIn = false;
    this.username = localStorage.getItem('username') || null;
  }
  
  login(user, pwd) {
  	if(!user || !pwd){
  		alert('请输入用户名和密码!');
  		return;
  	}
    this.authService.login(user, pwd).subscribe(() => {
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = '/home';
//      let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
        // Redirect the user
        this.router.navigate([redirect]);
      }
    });
  }
}