import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
	isAutomatic: boolean = false;					//自动接单
	isBusiness: boolean = false;					//营业状态
	select_index: number;
	type: number = 1;
	select_order: any = {};
	orders: any;
	order: any;
  constructor(private service: HomeService) { }

  ngOnInit() {
  	this.service.post('bk_online_orders', {
  		shop_id: localStorage.getItem('shopId')
  	}).then(
			res => {
	     	if(res.status == '200'){
	     		this.orders = res.orders;   		
	     		this.order = this.orders.new_order;   		
	     	};
	    }
		);
  }
	
	select(index: number, data: any): void {
		this.select_index = index;
		this.select_order = data;
		console.log(data);
	}
	
	select_type(index: number, type: any): void {
		this.type = index;
		this.order = this.orders[type];
		console.log(this.order);
	}
}
