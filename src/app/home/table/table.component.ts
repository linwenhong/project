import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
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
	private isMove: boolean = false;
	private last_id: any;
  constructor(private service: HomeService, private router: Router) { }

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
	//选中桌子
	select(data: any): void {
		if(this.isMove){
			this.isMove = false;
			this.toMove(data);
		}else{
			this.select_desk = data;
			console.log(data);
		}
	}
	//开台
	open(): void {
		this.shield = true;
		console.log(this.select_desk);
	}
	//取消开台
	hide(): void {
		this.shield = false;
	}
	//确定开台
	confirm(): void {
		this.shield = false;
		this.desk_status(1, this.peoples);
	}
	//选择移台
	move(): void {
		this.isMove = true;
		this.last_id = this.select_desk.table_id;
	}
	//移台
	toMove(data: any): void {
		let request = {
			shop_id: localStorage.getItem('shopId'),
			tableCode: this.last_id
		}
		request['newCode'] = data.table_id;
		this.service.post('bk_update_order_desk', request).then(
			res => {
				this.select_desk = {};
     		this.select_desk.status = -1;
     		
	     	if(res.status == '200'){
	     		this.getshop();
	     	}else{
	     		this.router.navigate(['/login']);
	     	};
	    }
		);
	}
	//清台
	clear(): void {
		let request = {
			shop_id: localStorage.getItem('shopId'),
			tableCode: this.select_desk.table_id
		}
		this.service.post('bk_clear_desk', request).then(
			res => {
	     	this.select_desk = {};
     		this.select_desk.status = -1;
     		
	     	if(res.status == '200'){
	     		this.getshop();
	     	}
	    }
		);
	}
	//修改桌子状态
	desk_status(status: number, peoples: any): void {
		let request = {
  		status: status,
  		tableCode: this.select_desk.table_id
  	};
		if(peoples) request['people'] = peoples;
  	console.log(request);
		this.service.post('bk_update_desk', request).then(
			res => {
	     	this.select_desk = {};
     		this.select_desk.status = -1;
     		
	     	if(res.status == '200'){
	     		this.getshop();
	     	}else{
	     		this.router.navigate(['/login']);
	     	};
	    }
		);
	}
}
