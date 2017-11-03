import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }          from '@angular/forms';

import { StatisticsRoutingModule } from "./statistics-routing.module";
import { StatisticsComponent } from './statistics.component';
import { StatisticsOrderComponent } from './statistics-order/statistics-order.component';
import { SummaryComponent } from './summary/summary.component';

import { StatisticsService } from './statistics.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StatisticsRoutingModule
  ],
  declarations: [StatisticsComponent, StatisticsOrderComponent, SummaryComponent],
  providers: [ StatisticsService ]
})
export class StatisticsModule { }
