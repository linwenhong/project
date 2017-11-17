import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { HomeService } from '../home.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
	public desk: any;
	public select_desk: any;
	public shield: boolean = false;
	public toClear: boolean = false;
	public orderDetails: boolean = false;
	checkout: boolean = false;							//结账窗口
	public peoples: any = null;
	public password: string = null;
	private isMove: boolean = false;
	private last: any;
	order: any;					//菜品列表
	pay_type: number = 1;
	check_type: number = 2;
	receivables: number = null;
	code: string = null;
	
  constructor(public service: HomeService, private router: Router, private http: Http) { 
  	service.nav_select = '1';
  }

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
		console.log(data);
		if(this.isMove){
			this.isMove = false;
			if(data.status!=0){
				this.select_desk = {};
  			this.select_desk.status = -1;
				notify('error', this.last.table_name+'移台失败', '请选择空闲的桌子');
				return;
			}
			this.toMove(data);
		}else{
			this.select_desk = data;
		}
	}
	//开台
	open(): void {
		this.shield = true;
		this.peoples = null;
		console.log(this.select_desk);
	}
	//取消开台
	hide(): void {
		this.shield = false;
		this.toClear = false;
		this.orderDetails = false;
		this.checkout = false;
		this.select_desk = {};
  	this.select_desk.status = -1;
	}
	//确定开台/修改人数
	confirm(): void {
		if(this.peoples<=0 || parseInt(this.peoples)!=this.peoples){
			notify('error', '输入错误', '请输入正整数的数字');
			return;
		}else{
			if(this.select_desk.status == 0){
				this.shield = false;
				this.desk_status(1, this.peoples);
			}else{
				this.service.post('bk_update_people', {
					shop_id: localStorage.getItem('shopId'),
					out_trade_no: this.select_desk.out_trade_no,
					people: this.peoples
				}).then(
					res => {
						this.shield = false;
			     	if(res.status == '200'){
			     		this.getshop();
			     		notify('success', '更改人数', this.select_desk.table_name+'更改人数成功!');
			     	}else{
			     		notify('error', '更改人数', res.msg);
			     	};
						this.select_desk = {};
		     		this.select_desk.status = -1;
			    }
				);
			}
		}
	}
	//选择移台
	move(): void {
		this.isMove = true;
		this.last = this.select_desk;
	}
	//移台
	toMove(data: any): void {
		let request = {
			shop_id: localStorage.getItem('shopId'),
			tableCode: data.table_id,
			oldCode: this.last.table_id
		}
		
		this.service.post('bk_update_order_desk', request).then(
			res => {
				this.select_desk = {};
     		this.select_desk.status = -1;
     		
	     	if(res.status == '200'){
	     		this.getshop();
	     		notify('success', '移台', this.last.table_name+'移动到'+data.table_name);
	     	}else{
	     		notify('error', '移台', res.msg);
	     	};
	    }
		);
	}
	//确认清台
	private confirm_clear(): void {
		let request = {
			shop_id: localStorage.getItem('shopId'),
			tableCode: this.select_desk.table_id
		}
		this.service.post('bk_clear_desk', request).then(
			res => {
	     	if(res.status == '200'){
	     		this.getshop();
	     		this.toClear = false;
	     		notify('success', '清台', this.select_desk.table_name+'清台成功!');
	     	}else{
	     		notify('error', '清台', res.msg);
	     	};
	     	this.select_desk = {};
     		this.select_desk.status = -1;
	    }
		);
	}
	//清台
	clear(): void {
		//已下单或结账
		if(this.select_desk.status>=2){
			this.toClear = true;
		}else{
			this.confirm_clear();
		}
	}
	//输密
	clear_table(): void {
		this.service.token(localStorage.getItem('username'), this.password).then(
			res => {
	     	if(res.code == '200'){
	     		this.confirm_clear();
	     	}	
	    }
		);
	}
	//修改桌子状态
	desk_status(status: number, peoples: any): void {
		let request = {
			shop_id: localStorage.getItem('shopId'),
  		status: status,
  		tableCode: this.select_desk.table_id
  	};
		if(peoples) request['people'] = peoples;
		this.service.post('bk_update_desk', request).then(
			res => {
	     	if(res.status == '200'){
	     		this.getshop();
	     		notify('success', '开台', this.select_desk.table_name+'开台成功!');
	     	}else{
	     		notify('error', '开台', res.msg);
	     	};
	     	this.select_desk = {};
     		this.select_desk.status = -1;
	    }
		);
	}
	//订单详情
	details(): void {
		this.service.post('bk_getorders', {
			shop_id: localStorage.getItem('shopId'),
			tableCode: this.select_desk.table_id
		}).then(
			res => {
	     	if(res.status == '200'){
	     		this.orderDetails = true;
	     		this.order = res;
	     	}else{
	     		notify('error', '获取订单失败', res.msg);
	     	};
	     	this.select_desk = {};
     		this.select_desk.status = -1;
	    }
		);
	}
	//结账
	toCheckout(): void {
		this.service.post('bk_getorders', {
			shop_id: localStorage.getItem('shopId'),
			tableCode: this.select_desk.table_id
		}).then(
			res => {
	     	if(res.status == '200'){
	     		this.checkout = true;
	     		this.order = res;
	     		this.receivables = res.realPrice;
	     		this.pay_type = 2;
	     		getFocus('#code');
	     	}else{
	     		notify('error', '获取订单失败', res.msg);
	     	};
	    }
		);
	}
	//确定结账
	payment(): void {
		let request = {};
		request['shop_id'] = localStorage.getItem('shopId');
		request['code'] = this.code;
		request['pay_type'] = this.pay_type;
		request['realPrice'] = this.receivables;//默认或手输
		request['discountPrice'] = this.order.discountPrice;
		request['totalPrice'] = this.order.totalPrice;
		request['out_trade_no'] = this.order.out_trade_no;
		console.log(request);
		
		this.service.post('bk_pay', request).then(
			res => {
				this.code = null;
				this.checkout = false;
     		this.select_desk = {};
   			this.select_desk.status = -1;
	     	if(res.status == '200'){
	     		notify('success', '支付成功', '订单已成功支付!');
     			this.getshop();
	     	}else{
	     		notify('error', '支付失败', res.msg);
	     	};
	    }
		);
	}
	payType(type: number): void {
		this.pay_type = type;
		if(type==0){
			getFocus('#actual');
		}else{
			getFocus('#code');
		}
	}
}