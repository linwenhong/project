import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { StatisticsComponent } from './statistics.component';
import { StatisticsOrderComponent } from './statistics-order/statistics-order.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [{
	path: '',
	component: StatisticsComponent,
	children: [{
		path: '',
		component: StatisticsOrderComponent
	},{
		path: 'order',
		component: StatisticsOrderComponent
	},{
		path: 'summary',
		component: SummaryComponent
	}]
}]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: []

})
export class StatisticsRoutingModule {}