import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
	public sub: any;                           
  public table_id: any;                //桌号
  public desk: any;                //桌号
  public shopping_statu: boolean = false;
  public menu_zdc: boolean = false;
  public menu: any;                       //菜品列表
  public category: any;                   //菜品分类列表
  public total: number = 0;
  public prices: number = 0;
  public menu_details: any;
  public select_category: string;
  public select_index: number;
  public sr: boolean = false;
  public shop_menu: any[];
	
  constructor(private service: HomeService) { }

  ngOnInit() {
  	this.select_index = 0;
  	this.select_category = '全部菜品';
		this.getfood();
  }
	//获取菜单列表
	private getfood(): void {
		this.service.get('bk_getfood?shop_id=2017092200077000000045535333').then(
			res => {
	      this.menu = res.food;    
	      this.init();
	    }
		);
	}
	//初始化选购商品数量
  private number_init(): void{
    for(let x in this.menu){
      for(let i in this.menu[x]){
        if(x == '套餐优惠') this.menu[x][i].isPackage = true;
        this.menu[x][i].num = 0;
      }
    }
  }
  //初始化页面数据
  private init(): void{
    this.category = [];
    for(let x in this.menu){
      this.category.push(x);
    }
    this.number_init();
    let site = JSON.parse(sessionStorage.getItem("my_menu"));
    let br = false;
    if(site){
      for(let x in site){
        br = false;
        this.total += site[x].num;
        this.prices += site[x].num*site[x].food_price;
        for(let i in this.menu){
          for(let j in this.menu[i]){
            if(site[x].food_number==this.menu[i][j].food_number){
              this.menu[i][j].num = site[x].num;
            };
          }
        }
      }      
    }
  }
  
  select(index: number, category: string): void{
  	this.select_index = index;
  	this.select_category = category;
  	console.log(this.menu[this.select_category]);
  }
}
