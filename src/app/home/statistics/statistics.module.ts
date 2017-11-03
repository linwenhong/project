import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from "./statistics-routing.module";
import { StatisticsComponent } from './statistics.component';
import { StatisticsOrderComponent } from './statistics-order/statistics-order.component';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  imports: [
    CommonModule,
    StatisticsRoutingModule
  ],
  declarations: [StatisticsComponent, StatisticsOrderComponent, SummaryComponent]
})
export class StatisticsModule { }
