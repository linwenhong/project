import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-single-dish',
  templateUrl: './single-dish.component.html',
  styleUrls: ['../statistics.component.css', './single-dish.component.css']
})
export class SingleDishComponent implements OnInit {
	start_time: any;
	end_time: any;
	condition: number;
	datas: any;
	total: number;
	
  constructor(public service: HomeService, public statisticsService: StatisticsService) {
  	statisticsService.select_nav = 3;
  }

  ngOnInit() {
  	this.search(null, null);
  }
  
	search(start: any, end: any): void {
		this.service.post('bk_food_report', {
  		shop_id: localStorage.getItem('shopId'),
  		start_time: start,
  		end_time: end
  	}).then(
			res => {
	     	if(res.status == '200'){
	     		this.total = 0;
	     		this.datas = res.orders;
	     		for(let x in this.datas){
	     			this.total += Number(this.datas[x].total);
	     		}
	     		setScroll();
	     	}else{
	     		notify('error', '错误', res.msg);
	     	};
	    }
		);
	}

}
