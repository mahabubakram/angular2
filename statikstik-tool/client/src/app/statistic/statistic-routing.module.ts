import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {StatisticDataResolver} from './statistic-data-resolver.service';

import {StatisticComponent} from './statistic.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'statistic',
      component: StatisticComponent,
      data: {title: 'Statistic View'},
      resolve: {
        statisticData: StatisticDataResolver
      }
    }
  ])],
  exports: [RouterModule]
})
export class StatisticRoutingModule {
}
