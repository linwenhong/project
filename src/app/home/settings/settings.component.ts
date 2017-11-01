import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
	select_nav: string;
	password1: string;
	password2: string;
	password3: string;
  constructor(private service: HomeService) { }

  ngOnInit() {
  	this.select_nav = sessionStorage.getItem('settings_select') || '1';
  }
	
	select(index: string): void {
		this.select_nav = index;
		sessionStorage.setItem('settings_select', index);
	}
	
	edit(): void {
		if(!this.password1 || !this.password2 || !this.password3){
			notify('error', '错误', '密码不能为空');
			return;
		}
		if(this.password2 != this.password3){
			notify('error', '错误', '两次输入的密码不同');
			return;
		}
		let user = JSON.parse(sessionStorage.getItem('user'));
		
		this.service.post('bk_change_password', {
			user_id: user.id,
  		username: user.username,
  		password: this.password1,
  		new_password: this.password3
  	}).then(
			res => {
	     	if(res.status == '200'){
	     		notify('success', '修改密码', '密码修改成功!');
	     	}else{
	     		notify('error', '错误', res.msg);
	     	};
	    }
		);
	}
}
