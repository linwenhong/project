import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
	select_nav: string;
	ticket: boolean = false;
	voice: boolean = false;
	order: boolean = false;
	settings: any  = {};
	password1: string;
	password2: string;
	password3: string;
  constructor(public service: HomeService) {
  	service.nav_select = '7';
  }

  ngOnInit() {
  	this.select_nav = sessionStorage.getItem('settings_select') || '1';
  	this.getSetting();
  }
	
	select(index: string): void {
		this.select_nav = index;
		sessionStorage.setItem('settings_select', index);
	}
	
	getSetting(): void {
		this.service.get('bk_get_setting?shop_id=' + localStorage.getItem('shopId')).then(
			res => {
	     	if(res.status == '200'){
	     		this.settings = res.data;
	     	}else{
	     		notify('error', '错误', res.msg);
	     	};
	    }
		);
	}
	
	editConfig(key: string): void {
		this.settings[key] = !this.settings[key];
	}
	
	set(): void {
		let request = {};
		request = this.settings;
		request['shop_id'] = localStorage.getItem('shopId');
		this.service.post('bk_update_setting', request).then(
			res => {
	     	if(res.status == '200'){
	     		notify('success', '设置', '设置成功!');
	     	}else{
	     		notify('error', '错误', res.msg);
	     	};
	    }
		);
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
