import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { StatisticsService } from './statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
	
  constructor(public service: HomeService, public statisticsService: StatisticsService) {
  	service.nav_select = '6';
  }

  ngOnInit() {}

}
