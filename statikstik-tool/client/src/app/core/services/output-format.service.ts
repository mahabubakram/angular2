import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {mockData} from '../mock-data';
import {BasicRestService} from './basic-rest.service';

export interface OutputFormat {
  value: number;
  id: string;
  display: string;
}

@Injectable()
export class OutputFormatService extends BasicRestService<OutputFormat> {

  protected api = 'outputFormats';//'https://drv-mock-services.eu-de.mybluemix.net/api/';
  private mockData = mockData;

  constructor(protected http: Http) {
    super();
  }

  public getOutputFormats(): Observable<[OutputFormat]> {
    /**
     * Mocking
     */
    return Observable.create(observer => {
      observer.next(this.mockData.outputFormats);
      observer.complete();
    });

    /*
     return this.get();
     */

  }
}
