import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { HomeComponent } from "./home/home.component";
import { TableComponent } from './table/table.component';
import { ShopComponent } from './shop/shop.component';
import { OrderComponent } from './order/order.component';
const routes: Routes = [{
	path: '',
	component: HomeComponent,
	children: [{
		path: '',
		component: TableComponent
	}, {
		path: 'shop',
		component: ShopComponent
	}, {
		path: 'shop/:id',
		component: ShopComponent
	}, {
		path: 'order',
		component: OrderComponent
	}]
}]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: []

})
export class HomeRoutingModule {}