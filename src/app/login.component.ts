import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from './auth.service';
import { FormsModule }          from '@angular/forms';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
	message: string;
	public username: string;
	public password: string;
	
  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
    this.authService.isLoggedIn = false;
  }
  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }
  login(user, pwd) {
    this.message = 'Trying to log in ...';
    this.authService.login(user, pwd).subscribe(() => {
      this.setMessage();
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