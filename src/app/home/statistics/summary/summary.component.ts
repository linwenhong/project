import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
	start_time: any;
	end_time: any;
	condition: number;
  constructor(public service: HomeService, public statisticsService: StatisticsService) {
  	statisticsService.select_nav = 2;
  }

  ngOnInit() {
  }
  
	search(start: any, end: any): void {
		console.log(start, end);
		//todo
		
	}
}
