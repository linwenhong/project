import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }          from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from "./home-routing.module";
import { TableComponent } from './table/table.component';
import { ShopComponent } from './shop/shop.component';
import { OrderComponent } from './order/order.component';
import { HomeService } from './home.service';
import { StatisticsComponent } from './statistics/statistics.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		HomeRoutingModule
	],
	declarations: [HomeComponent, TableComponent, ShopComponent, OrderComponent, StatisticsComponent, SettingsComponent],
	providers: [ HomeService ]
})
export class HomeModule {}