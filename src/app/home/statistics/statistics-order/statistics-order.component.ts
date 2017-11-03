import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-statistics-order',
  templateUrl: './statistics-order.component.html',
  styleUrls: ['./statistics-order.component.css']
})
export class StatisticsOrderComponent implements OnInit {
	type: number = 1;											//订单类型
	select_order: any = {};
	orders: any;													//api返回的所有订单
	order: any;														//选中订单类型订单
	start_time: string;
	end_time: string;
	
  constructor(public service: HomeService) { }

  ngOnInit() {
  	
  }

}
