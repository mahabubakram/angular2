import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {mockData} from '../mock-data';
import {BasicRestService} from './basic-rest.service';

export interface Ergaenzende {
  value: number;
  id: string;
  display: string;
}

@Injectable()
export class ErgaenzendeService extends BasicRestService<Ergaenzende> {

  protected api = 'service';//'https://drv-mock-services.eu-de.mybluemix.net/api/';
  private mockData = mockData;

  constructor(protected http: Http) {
    super();
  }

  public getServices(): Observable<[Ergaenzende]> {

    /**
     * Mocking
     */
    return Observable.create(observer => {
      observer.next(this.mockData.services);
      observer.complete();
    });

    /*
     return this.get();
     */

  }
}
