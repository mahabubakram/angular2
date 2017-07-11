import {NgModule} from '@angular/core';
import {MyDatePickerModule} from 'mydatepicker';
import {SelectModule} from 'ng2-select';
import {AlertModule, BsDropdownModule, DatepickerModule} from 'ngx-bootstrap';
import {DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {SharedModule} from '../shared/shared.module';
import {CarrierAndServicesComponent} from './carrier-services-component/carrier-services.component';
import {StatisticDataResolver} from './statistic-data-resolver.service';
import {StatisticRoutingModule} from './statistic-routing.module';
import {StatisticComponent} from './statistic.component';



@NgModule({
  declarations: [
    StatisticComponent,
    CarrierAndServicesComponent
  ],
  imports: [
    SharedModule,
    MyDatePickerModule,
    AlertModule.forRoot(),
    DatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    SelectModule,
    StatisticRoutingModule,
    FormsModule
  ],
  exports: [StatisticComponent],
  providers: [StatisticDataResolver, DatePipe]
})
export class StatisticModule {
}



