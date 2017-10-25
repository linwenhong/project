import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
	public desk: any;
	public select_desk: any;
	public shield: boolean = false;
	public peoples: any = null;
  constructor(private service: HomeService) { }

  ngOnInit() {
		this.getshop();
  	this.select_desk = {};
  	this.select_desk.status = -1;
  }
	//获取桌子列表
	private getshop(): void {
		this.service.get('bk_getshop?shop_id='+localStorage.getItem('shopId')).then(
			res => {
	      this.desk = res.desk;
	    }
		);
	}
	
	select(data: any): void {
		console.log(data);
		this.select_desk = data;
	}
	//开台
	open(): void {
		this.shield = true;
	}
	//取消
	hide(): void {
		this.shield = false;
	}
	//确定开台
	confirm(): void {
		this.shield = false;
		console.log(this.peoples);
	}
}
