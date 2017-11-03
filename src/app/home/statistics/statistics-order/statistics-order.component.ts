import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';

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
	
  constructor(public service: HomeService) { }

  ngOnInit() {
  	
  }
	
	search(start: any, end: any): void {
		//获取订单
  	this.service.post('bk_get_report', {
  		shop_id: localStorage.getItem('shopId')
  	}).then(
			res => {
	     	if(res.status == '200'){
	     		this.orders = res.orders;   		
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
}
