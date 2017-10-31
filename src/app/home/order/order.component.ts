import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
	isAutomatic: boolean = false;					//自动接单
	isBusiness: boolean = false;					//营业状态
  constructor() { }

  ngOnInit() {
  }

}
