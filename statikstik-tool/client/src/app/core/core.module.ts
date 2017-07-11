import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {AbStelleService} from './services/ab-stelle.service';
import {AbfragebereichService} from './services/abfrage.service';
import {ErgaenzendeService} from './services/ergaenzende.service';
import {OutputFormatService} from './services/output-format.service';
import {ReportService} from './services/report.service';
import {SuchzeitraumService} from './services/such-zeitraum.service';
import {TraegerService} from './services/traeger.service';
import {UtilityFunctions} from './utility';
import {GetReportService} from "./services/get-report.service";

@NgModule({
  imports: [
    HttpModule,
    RouterModule,
  ],
  providers: [
    UtilityFunctions,
    AbStelleService,
    AbfragebereichService,
    ErgaenzendeService,
    OutputFormatService,
    ReportService,
    SuchzeitraumService,
    TraegerService,
    GetReportService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
