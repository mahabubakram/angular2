import {NgModule} from '@angular/core';
// import {ChartModule} from 'angular2-highcharts';

import {SharedModule} from '../shared/shared.module';
import {DashboardComponent} from './dashboard-sensor.component';
import {WebSocketService} from '../core/services/webSocket.service';
import {RestService} from "../core/services/rest.service";
import {ChartsModule} from "ng2-charts";
import {TimePipe} from '../shared/pipes/time-pipe/time.pipe';
// import * as highCharts from "highcharts";

@NgModule({
    declarations: [
        DashboardComponent, TimePipe
    ],
    imports: [
        SharedModule,
        ChartsModule
        // ChartModule.forRoot(highCharts)
    ],
    exports: [DashboardComponent, TimePipe],
    providers: [ WebSocketService, RestService ]
})
export class DashboardSensorModule {
}
