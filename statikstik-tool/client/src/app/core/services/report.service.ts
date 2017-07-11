import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {mockData} from '../mock-data';
import {BasicRestService} from './basic-rest.service';

export interface Report {
  value: number;
  display: string;
  visible: boolean;
  id: string;
}

@Injectable()
export class ReportService extends BasicRestService<Report> {

  protected api = 'reports';//'https://drv-mock-services.eu-de.mybluemix.net/api/';
  private mockData = mockData;

  constructor(protected http: Http) {
    super();
  }

  public getReports(): Observable<[Report]> {
    /**
     * Mocking
     */
    return Observable.create(observer => {
      observer.next(this.mockData.reports);
      observer.complete();
    });

    /*
     * return this.get();
     */

  }
}
