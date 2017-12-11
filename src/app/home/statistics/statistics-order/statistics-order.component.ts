import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-statistics-order',
  templateUrl: './statistics-order.component.html',
  styleUrls: ['./statistics-order.component.css']
})
export class StatisticsOrderComponent implements OnInit {
	select_order: any = {};
	select_index: number;
	orders: any;
	start_time: string;
	end_time: string;
	condition: number;
	
	remake: string;
	isRefund: boolean;
	password: string;
	
  constructor(public service: HomeService, public statisticsService: StatisticsService) {
  	statisticsService.select_nav = 1;
  }

  ngOnInit() {
  	this.search(null, null);
  }
	
	search(start: any, end: any): void {
		//获取订单
  	this.service.post('bk_get_report', {
  		shop_id: localStorage.getItem('shopId'),
  		start_time: start,
  		end_time: end
  	}).then(
			res => {
	     	if(res.status == '200'){
	     		this.orders = res.orders;   	
	     		setScroll();
	     	}else{
	     		notify('error', '错误', res.msg);
	     	};
	    }
		);
	}
	//订单详情
	select(index: number, data: any): void {
		this.select_order = data;
		this.select_index = index;
	}
	
	hide(): void {
		this.remake = null;
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
		var request = {};
		request['refund_amount'] = this.select_order.total_amount;
		request['refund_reason ']= this.remake;
		request['shop_id'] = localStorage.getItem('shopId');
		if (this.select_order.type == 1){
			request['out_trade_no'] = 0;
  		request['trade_no'] = this.select_order.trade_no;
		}else {
			request['out_trade_no'] = this.select_order.trade_no;
  		request['trade_no'] = 0;
		}
		this.service.post('bk_refund', request).then(
			res => {
				this.isRefund = false;
	     	if(res.status == '200'){
	     		this.search(null, null);
	     		notify('success', '退款', '订单'+this.select_order.trade_no+'已成功退款!');
	     	}else{
	     		notify('error', '错误', res.msg);
	     	};
	    }
		).catch( err => notify('error', '错误', '退款失败'));
	}
}
