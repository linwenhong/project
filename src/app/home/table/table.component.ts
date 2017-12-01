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
	lis: any;
	clear_title: string;
	
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
	      setScroll();
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
		getFocus('.peoples');
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
	     		this.orderDetails = false;
	     		notify('success', this.clear_title, this.select_desk.table_name+this.clear_title+'成功!');
	     	}else{
	     		notify('error', this.clear_title, res.msg);
	     	};
	     	this.select_desk = {};
     		this.select_desk.status = -1;
	    }
		);
	}
	//清台
	clear(title: string): void {
		getFocus('.password');
		this.clear_title = title;
		//已下单或结账
		if(this.select_desk.status>=2){
			this.toClear = true;
			this.password = '';
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
	     		this.lis = [];
	     		for(let x in this.order.dish){
						this.lis[x] = false;
					}
	     	}else{
	     		notify('error', '获取订单失败', res.msg);
	     	};
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
	     		this.pay_type = 1;
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
	//支付类型
	payType(type: number): void {
		this.pay_type = type;
		if(type==0){
			getFocus('#actual');
		}else{
			getFocus('#code');
		}
	}
	//选择退菜项
	selectedItem(index: any): void {
		this.lis[index] = !this.lis[index];
	}
	//退菜
	retreatFood(): void {
		let isNew = false;
		let n = 0;
		let dish: any = {};
		for(let x in this.lis){
			if(!this.lis[x]){
				if(!dish[this.order.dish[x].goodsId]){
					dish[this.order.dish[x].goodsId] = this.order.dish[x].num;
				}else{
					dish[this.order.dish[x].goodsId] += this.order.dish[x].num;
				}
			}else{
				n++;
				isNew = true;
			}
		}
		
		if(!isNew){
			notify('error', '操作错误', '请选择退菜菜品!');
			return;
		}
		
		if(this.order.dish.length==n){
			this.clear('退菜');
		}
		
		let url = window.location.host;
		let packages: any = {};
		let request = {
    	shop_id: localStorage.getItem('shopId'),
    	detailUrl: url,
    	tableCode: this.select_desk.table_id,
    	people: this.select_desk.people,
    	dish: JSON.stringify(dish),
    	package: JSON.stringify(packages),
    	description: this.order.description,
    	user_id: '',
    	order_type: this.order.order_type,
    	out_trade_no: this.order.out_trade_no
    }
    this.service.post('bk_orderdish', request).then(
			response => {
				if(response.status==200){
					this.orderDetails = false;
					this.select_desk = {};
			  	this.select_desk.status = -1;
	  			notify('success', '退菜成功', '你已退菜成功!');
	     	}else{
	     		notify('error', '退菜失败', response.msg);
	     	};
	    }
		);
	}
}