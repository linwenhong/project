import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { HomeService } from '../home.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
	public desk: any;
	public select_desk: any;
	public shield: boolean = false;
	public toClear: boolean = false;
	public orderDetails: boolean = false;
	checkout: boolean = false;							//结账窗口
	public peoples: any = null;
	public password: any = null;
	private isMove: boolean = false;
	private last: any;
	dish: any;					//菜品列表
	totalPrice: any;		//总价格
	realPrice: any;			//实付
	
	
  constructor(private service: HomeService, private router: Router, private http: Http) { }

  ngOnInit() {
		this.getshop();
  	this.select_desk = {};
  	this.select_desk.status = -1;
  }
	//获取桌子列表
	private getshop(): void {
		this.service.get('bk_getshop?shop_id='+localStorage.getItem('shopId')).then(
			res => {
	      this.desk = res.desk;
	    }
		);
	}
	//选中桌子
	select(data: any): void {
		console.log(data);
		if(this.isMove){
			this.isMove = false;
			if(data.status!=0){
				this.select_desk = {};
  			this.select_desk.status = -1;
				notify('error', this.last.table_num+'移台失败', '请选择空闲的桌子');
				return;
			}
			this.toMove(data);
		}else{
			this.select_desk = data;
		}
	}
	//开台
	open(): void {
		this.shield = true;
		this.peoples = null;
		console.log(this.select_desk);
	}
	//取消开台
	hide(): void {
		this.shield = false;
		this.toClear = false;
		this.orderDetails = false;
		this.checkout = false;
		this.select_desk = {};
  	this.select_desk.status = -1;
	}
	//确定开台/修改人数
	confirm(): void {
		if(this.peoples<=0 || parseInt(this.peoples)!=this.peoples){
			notify('error', '输入错误', '请输入正整数的数字');
			return;
		}else{
			if(this.select_desk.status == 0){
				this.shield = false;
				this.desk_status(1, this.peoples);
			}else{
				this.service.post('bk_update_people', {
					shop_id: localStorage.getItem('shopId'),
					out_trade_no: this.select_desk.out_trade_no,
					people: this.peoples
				}).then(
					res => {
						this.shield = false;
			     	if(res.status == '200'){
			     		this.getshop();
			     		notify('success', '更改人数', this.select_desk.table_num+'更改人数成功!');
			     	}else{
			     		notify('error', '更改人数', res.msg);
			     	};
						this.select_desk = {};
		     		this.select_desk.status = -1;
			    }
				);
			}
		}
	}
	//选择移台
	move(): void {
		this.isMove = true;
		this.last = this.select_desk;
	}
	//移台
	toMove(data: any): void {
		let request = {
			shop_id: localStorage.getItem('shopId'),
			tableCode: data.table_id,
			oldCode: this.last.table_id
		}
		
		this.service.post('bk_update_order_desk', request).then(
			res => {
				this.select_desk = {};
     		this.select_desk.status = -1;
     		
	     	if(res.status == '200'){
	     		this.getshop();
	     		notify('success', '移台', this.last.table_num+'移动到'+data.table_num);
	     	}else{
	     		notify('error', '移台', res.msg);
	     	};
	    }
		);
	}
	//确认清台
	private confirm_clear(): void {
		let request = {
			shop_id: localStorage.getItem('shopId'),
			tableCode: this.select_desk.table_id
		}
		this.service.post('bk_clear_desk', request).then(
			res => {
	     	if(res.status == '200'){
	     		this.getshop();
	     		this.toClear = false;
	     		notify('success', '清台', this.select_desk.table_num+'清台成功!');
	     	}else{
	     		notify('error', '清台', res.msg);
	     	};
	     	this.select_desk = {};
     		this.select_desk.status = -1;
	    }
		);
	}
	//清台
	clear(): void {
		//已下单或结账
		if(this.select_desk.status>=2){
			this.toClear = true;
		}else{
			this.confirm_clear();
		}
	}
	//清台输密
	clear_table(): void {
		this.http.post(environment.api_url+'bk_login',{
			username: localStorage.getItem('username'),
			password: this.password
		}).toPromise().then(
			response => {
				let regions = response.json();
	     	if(regions.code == '200'){
	     		console.log(response.headers.get('Authorization'));
	     		sessionStorage.setItem('token', regions.token);
	     		this.confirm_clear();
	     	}else{
	     		notify('error', '输入错误', '请输入正确的密码!');
	     	};
	    }
		);
	}
	//修改桌子状态
	desk_status(status: number, peoples: any): void {
		let request = {
			shop_id: localStorage.getItem('shopId'),
  		status: status,
  		tableCode: this.select_desk.table_id
  	};
		if(peoples) request['people'] = peoples;
		this.service.post('bk_update_desk', request).then(
			res => {
	     	if(res.status == '200'){
	     		this.getshop();
	     		notify('success', '开台', this.select_desk.table_num+'开台成功!');
	     	}else{
	     		notify('error', '开台', res.msg);
	     	};
	     	this.select_desk = {};
     		this.select_desk.status = -1;
	    }
		);
	}
	//订单详情
	details(): void {
		this.service.post('bk_getorders', {
			shop_id: localStorage.getItem('shopId'),
			tableCode: this.select_desk.table_id
		}).then(
			res => {
	     	if(res.status == '200'){
	     		this.orderDetails = true;
	     		this.dish = res.dish;
	     		this.totalPrice = res.totalPrice;
	     	}else{
	     		notify('error', '获取订单失败', res.msg);
	     	};
	     	this.select_desk = {};
     		this.select_desk.status = -1;
	    }
		);
	}
	toCheckout(): void {
		this.service.post('bk_getorders', {
			shop_id: localStorage.getItem('shopId'),
			tableCode: this.select_desk.table_id
		}).then(
			res => {
	     	if(res.status == '200'){
	     		this.checkout = true;
	     		this.dish = res.dish;
	     		this.totalPrice = res.totalPrice;
	     	}else{
	     		notify('error', '获取订单失败', res.msg);
	     	};
	    }
		);
	}
}
