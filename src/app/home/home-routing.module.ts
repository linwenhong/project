import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { AuthGuard } from '../auth-guard.service';

import { HomeComponent } from "./home/home.component";
import { TableComponent } from './table/table.component';
import { ShopComponent } from './shop/shop.component';
import { OrderComponent } from './order/order.component';
const routes: Routes = [{
	path: '',
	component: HomeComponent,
	canActivate: [AuthGuard],
	children: [{
		path: 'table',
		component: TableComponent,
		canActivate: [AuthGuard]
	}, {
		path: '',
		component: ShopComponent,
		canActivate: [AuthGuard]
	}, {
		path: 'order',
		component: OrderComponent,
		canActivate: [AuthGuard]
	}]
}]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: []

})
export class HomeRoutingModule {}