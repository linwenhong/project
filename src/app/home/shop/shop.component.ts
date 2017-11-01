import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  public table_id: any;               //桌号id
  public table_num: any;              //桌号
  public peoples: any;								//人数
  public isPack: boolean = false;			//是否打包
	public menu: any;                   //菜品列表
  public category: any;               //菜品分类列表
  public total: number = 0;						//下单菜品总数
  public prices: number = 0;					//下单菜品总价
  public select_category: string = '全部菜品';
  public select_index: number = 0;
  public shop_menu: any[];
  public time: any;
  public s: number;
  public isNext: boolean = false;
  public remake: string = '';
	
  constructor(private service: HomeService, private activatedRoute: ActivatedRoute, private router: Router) {
  	service.nav_select = '2';
  }

  ngOnInit() {
  	if(this.activatedRoute.snapshot.params["id"]){
  		this.table_num = this.activatedRoute.snapshot.params["id"].split('#')[0];
  		this.peoples = this.activatedRoute.snapshot.params["id"].split('#')[1];
  	}
		this.getfood();
  }
	//获取菜单列表
	private getfood(): void {
		this.service.get('bk_getfood?shop_id='+localStorage.getItem('shopId')).then(
			res => {
				if(res.status == '200'){
	     		this.menu = res.food;    
	      	this.init();  		
	     	}else{
	     		notify('error', '错误', res.msg);
	     	};
	    }
		);
	}
	//初始化选购商品数量
  private number_init(): void{
    for(let x in this.menu){
      for(let i in this.menu[x]){
        if(x == '套餐优惠') this.menu[x][i].isPackage = true;
        this.menu[x][i].num = 0;
        this.menu[x][i].isShow = false;
      }
    }
  }
  //初始化页面数据
  private init(): void{
  	this.service.get('bk_getshop?shop_id='+localStorage.getItem('shopId')).then(
			res => {
	      for(let x in res.desk){
	      	if(res.desk[x].table_num==this.table_num){
	      		this.table_id = res.desk[x].table_id;
	      	}
	      };
	    }
		);
    this.category = [];
    for(let x in this.menu){
      this.category.push(x);
    }
    this.number_init();
//  let site = JSON.parse(sessionStorage.getItem("my_menu"));
//  let br = false;
//  if(site){
//    for(let x in site){
//      br = false;
//      this.total += site[x].num;
//      this.prices += site[x].num*site[x].food_price;
//      for(let i in this.menu){
//        for(let j in this.menu[i]){
//          if(site[x].food_number==this.menu[i][j].food_number){
//            this.menu[i][j].num = site[x].num;
//          };
//        }
//      }
//    }      
//  }
  }
	//选择分类
  select(index: any, category: string): void{
  	this.select_index = index;
  	this.select_category = category;
  }
  //是否打包
  pack(isPack: boolean): void{
  	this.isPack = isPack;
  }
	//保存菜单
  setShop(data: any, type: number): void{
  	if(!this.table_id){
  		notify('error', '未选择桌子', '请先选择一个桌子');
  		this.router.navigate(['/home']);
  		return;
  	}
  	let edit_num,num;
  	edit_num = type;
  	if(type==0){
  		num = 0;
  		this.total -= data.num;
  		this.prices -= data.num*data.food_price;
  	}else{
  		num = data.num + edit_num;
			this.total += edit_num;
			this.prices += data.food_price*edit_num;
  	}
  	for(let x in this.menu){
      for(let i in this.menu[x]){
        if(this.menu[x][i].food_number==data.food_number){
          this.menu[x][i].num = num;
        }
      }
    }
  }
  //长按
  sell(data: any): void{
		this.s = 0;
		this.time = setInterval(function() {
	    if(this.s < 3){
        this.s++;
	    }else{
	    	data.isShow = true;
        clearInterval(this.time);
	    }
		}, 500);
  }
  //鼠标松开
  toUp(): void{
  	clearInterval(this.time);
  }
  //售罄操作
  edit_statu(data: any, statu: number): void{
  	data.isShow = false;
  	let request = {
  		shop_id: localStorage.getItem('shopId'),
  		status: statu,
  		food_number: data.food_number
  	};
  	this.service.post('bk_update_food', request).then(
			res => {
	     	if(res.status == '200'){
	     		for(let x in this.menu){
			      for(let i in this.menu[x]){
			        if(this.menu[x][i].food_number==data.food_number){
			          this.menu[x][i].status = statu;
			        }
			      }
			    }
	     	};
	    }
		);
  }
  //清空
  clear(): void{
  	this.total = 0;
    this.prices = 0;
    this.number_init();
    sessionStorage.removeItem("my_menu");
  }
  next(): void{
    if(this.total==0){
			notify('error', '未选择菜品', '请选择菜品');
			return;
		}
  	this.isNext = true;
  }
  hide(): void{
  	this.isNext = false;
  	this.remake = null;
  }
  //下单
  confirm(): void {
    this.shop_menu = [];
    let n = 0;
    let find: boolean = false;
    for(let x in this.menu){
      for(let i in this.menu[x]){
        if(this.menu[x][i].num){
          for(let l in this.shop_menu){
            if(this.menu[x][i].food_number==this.shop_menu[l].food_number) find = true;
          }
          if(find){
            find = false;
            break;
          } 
          this.shop_menu[n++] = this.menu[x][i];
        }
      }
    }
//  sessionStorage.setItem('my_menu', JSON.stringify(this.shop_menu));
    
    let dish: any = {};
    let packages: any = {};
    for(let x in this.shop_menu){
      if(this.shop_menu[x].isPackage){
        packages[this.shop_menu[x].food_number] = this.shop_menu[x].num;
      }else{        
        dish[this.shop_menu[x].food_number] = this.shop_menu[x].num;
      }
    }
    let url = window.location.host;
    let order_type = (this.isPack)?1:0;
    let request = {
    	shop_id: localStorage.getItem('shopId'),
    	detailUrl: url,
    	tableCode: this.table_id,
    	people: this.peoples,
    	dish: JSON.stringify(dish),
    	package: JSON.stringify(packages),
    	description: this.remake,
    	user_id: '',
    	order_type: order_type
    }
    this.service.post('bk_orderdish', request).then(
			res => {
				if(res.status==200){
					this.isNext = false;
	  			this.remake = null;
	  			notify('success', '下单成功', '你已下单成功!');
					this.router.navigate(['/home']);
	     	}else{
	     		notify('error', '下单成功', res.msg);
	     	};
	    }
		);
  }
}