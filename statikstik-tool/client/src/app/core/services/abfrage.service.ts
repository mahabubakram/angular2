import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {BasicRestService} from './basic-rest.service';

export interface Abfrage {
  value: number;
  display: string;
  id: string;
}

@Injectable()
export class AbfragebereichService extends BasicRestService<Abfrage> {

  protected api = 'statisticScopes';//'https://drv-mock-services.eu-de.mybluemix.net/api/';

  constructor(protected http: Http) {
    super();
  }

  public getStatisticScopes(): Observable<[Abfrage]> {
    return this.get();
  }


}
