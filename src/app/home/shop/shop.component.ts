import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(private service: HomeService) { }

  ngOnInit() {
		this.getfood();
  }
	
	private getfood(): void {
		this.service.get('bk_getfood?shop_id=2017092200077000000045535333').then(
			res => {
				console.log(res);
			}
		);
	}
}
