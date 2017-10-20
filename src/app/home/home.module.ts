import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from "./home-routing.module";
import { TableComponent } from './table/table.component';
import { ShopComponent } from './shop/shop.component';
import { OrderComponent } from './order/order.component';
import { HomeService } from './home.service';

@NgModule({
	imports: [
		CommonModule,
		HomeRoutingModule
	],
	declarations: [HomeComponent, TableComponent, ShopComponent, OrderComponent],
	providers: [ HomeService ]
})
export class HomeModule {}