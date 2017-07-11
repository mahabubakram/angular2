import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/operator/zip';
import {Observable} from 'rxjs/Observable';
import {Abstelle, AbStelleService} from '../core/services/ab-stelle.service';
import {Abfrage, AbfragebereichService} from '../core/services/abfrage.service';
import {Ergaenzende, ErgaenzendeService} from '../core/services/ergaenzende.service';
import {OutputFormat, OutputFormatService} from '../core/services/output-format.service';
import {Report, ReportService} from '../core/services/report.service';
import {Suchzeitraum, SuchzeitraumService} from '../core/services/such-zeitraum.service';
import {Traeger, TraegerService} from '../core/services/traeger.service';

export interface Statistic {
  traeger: Traeger[];
  abStellen: Abstelle[];
  abfragen: Abfrage[];
  ergaenzende: Ergaenzende[];
  outputFormats: OutputFormat[];
  reports: Report[];
  searchScopes: Suchzeitraum[];
  role?: number;
  workingDays?: number[];
}
@Injectable()
export class StatisticDataResolver implements Resolve<any> {
  constructor(private abStelleService: AbStelleService,
              private abfrageService: AbfragebereichService,
              private ergaenzendeService: ErgaenzendeService,
              private outputFormatService: OutputFormatService,
              private reportService: ReportService,
              private suchzeitraumService: SuchzeitraumService,
              private traegerService: TraegerService) {
  }

  /**
   * function to resolve on router call
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Statistic> {

    const combinedServiceResults = Observable.zip(
      this.traegerService.getTraeger(500),
      this.abStelleService.getAbStelle(500),
      this.abfrageService.getStatisticScopes(),
      this.ergaenzendeService.getServices(),
      this.outputFormatService.getOutputFormats(),
      this.reportService.getReports(),
      this.suchzeitraumService.getSearchScopes(),
      (traeger, abStellen, abfragen, ergaenzende, outputFormats, reports, searchScopes) => {
        return {traeger, abStellen, abfragen, ergaenzende, outputFormats, reports, searchScopes};
      });
    return combinedServiceResults;

  }
}
