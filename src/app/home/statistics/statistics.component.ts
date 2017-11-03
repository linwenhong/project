import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
	select_nav: number = 1;
	
  constructor(public service: HomeService) {
  	service.nav_select = '6';
  }

  ngOnInit() {}

}
