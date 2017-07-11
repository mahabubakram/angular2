import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {mockData} from '../mock-data';
import {BasicRestService} from './basic-rest.service';

export interface Suchzeitraum {
  value: number;
  display: string;
  id: string;
}


@Injectable()
export class SuchzeitraumService extends BasicRestService<Suchzeitraum> {

  protected api = 'searchScopes', ;//'https://drv-mock-services.eu-de.mybluemix.net/api/';
  private mockData = mockData;

  constructor(protected http: Http) {
    super();
  }

  public getSearchScopes(): Observable<[Suchzeitraum]> {
    /**
     * Mocking
     */
    return Observable.create(observer => {
      observer.next(this.mockData.searchScopes);
      observer.complete();
    });

    /*
     return this.get();
     */

  }
}
