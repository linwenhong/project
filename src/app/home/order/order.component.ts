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
	isAutomatic: boolean = true;					//自动接单
	isBusiness: boolean = true;						//营业状态
	select_index: number;
	type: number = 1;											//订单类型
	select_order: any = {};
	orders: any;													//api返回的所有订单
	order: any;														//选中订单类型订单
	new_orders: any;											//新的订单列表
	isRefund: boolean = false;
	password: string = null;
	remake: string = null;
	
  constructor(public service: HomeService, private http: Http) { 
  	service.nav_select = '3';
  	this.new_orders = service.new_orders;
  }

  ngOnInit() {
		this.getOrder();
  }
  
  getOrder(isAgain: boolean = false): void {
  	//获取订单
  	this.service.post('bk_online_orders', {
  		shop_id: localStorage.getItem('shopId')
  	}).then(
			res => {
	     	if(res.status == '200'){
	     		this.orders = res.orders;
	     		if(isAgain){
	     			this.order = this.orders.finish_order;
	     		}else{
	     			this.order = this.orders.doing_order;
	     		}
	     		setScroll();
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
		setScroll();
  }
	//订单详情
	select(index: number, data: any): void {
		this.select_index = index;
		this.select_order = data;
	}
	//选中订单类型
	select_type(index: number, type: any): void {
		this.select_index = null;
		this.select_order = {};
		this.type = index;
		if(!type){
			this.order = this.service.new_orders;
		}else{
			this.order = this.orders[type];
		}
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
	hide(): void {
		this.isRefund = false;
	}
	//弹出密码输入框
	toRefund(): void {
		this.remake = null;
		this.isRefund = true;
		getFocus('.refund_remake');
	}
	//退款密码确认
	confirm(): void {
		this.service.token(localStorage.getItem('username'), this.password).then(
			res => {
	     	if(res.code == '200'){
	     		this.refund();
	     	}	
	    }
		);
	}
	//确定退款
	refund(): void {
		this.service.post('bk_refund', {
			shop_id: localStorage.getItem('shopId'),
  		out_trade_no: this.select_order.out_trade_no,
  		trade_no: this.select_order.trade_no,
  		refund_amount: this.select_order.realPrice,
  		refund_reason: this.remake
  	}).then(
			res => {
				this.isRefund = false;
	     	if(res.status == '200'){
	     		this.getOrder(true);
	     		notify('success', '退款', '订单'+this.select_order.out_trade_no+'已成功退款!');
	     	}else{
	     		notify('error', '错误', res.msg);
	     	};
	    }
		);
	}
}
