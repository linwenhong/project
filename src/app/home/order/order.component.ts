import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HomeService } from '../home.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
	isAutomatic: boolean = false;					//自动接单
	isBusiness: boolean = false;					//营业状态
	select_index: number;
	type: number = 1;											//订单类型
	select_order: any = {};
	orders: any;													//api返回的所有订单
	order: any;														//选中订单类型订单
	new_orders: any;											//新的订单列表
	
  constructor(public service: HomeService, private http: Http) { 
  	service.nav_select = '3';
  	this.new_orders = service.new_orders;
  }

  ngOnInit() {
		//获取订单
  	this.service.post('bk_online_orders', {
  		shop_id: localStorage.getItem('shopId')
  	}).then(
			res => {
	     	if(res.status == '200'){
	     		this.orders = res.orders;   		
	     		this.order = this.orders.doing_order;
	     	}else{
	     		notify('error', '错误', res.msg);
	     	};
	    }
		);
		//获取新的订单
		this.http.post(environment.api_url+'bk_new_orders', {
  		shop_id: localStorage.getItem('shopId')
  	}).toPromise().then(
  		response => {
  			let res = response.json();
  			if(res.status == '200'){
	     		this.service.new_orders = res.orders.new_order;
	     	}else{
	     		notify('error', '错误', res.msg);
	     	};
  		}
		);
  }
  
	//订单详情
	select(index: number, data: any): void {
		this.select_index = index;
		this.select_order = data;
		console.log(data);
	}
	//选中订单类型
	select_type(index: number, type: any): void {
		
		this.type = index;
		if(!type){
			this.order = this.service.new_orders;
		}else{
			this.order = this.orders[type];
		}
		console.log(this.order);
	}
	//打印小票
	print(): void {
		this.service.post('bk_print_order', {
  		shop_id: localStorage.getItem('shopId'),
  		out_trade_no: this.select_order.out_trade_no
  	}).then(
			res => {
	     	if(res.status == '200'){
	     		print_data(res);
	     	}else{
	     		notify('error', '错误', res.msg);
	     	};
	    }
		);
	}
}
