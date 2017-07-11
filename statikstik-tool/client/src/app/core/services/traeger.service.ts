import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {BasicRestService} from './basic-rest.service';

export interface Traeger {
  id: string;
  institution: string;
}
@Injectable()
export class TraegerService extends BasicRestService<Traeger> {

  protected api = 'level';//'https://drv-mock-services.eu-de.mybluemix.net/api/';

  constructor(protected http: Http) {
    super();
  }

  public getTraeger(level): Observable<[Traeger]> {
    return this.get(`${level}traeger`);
  }
}
