import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {BasicRestService} from './basic-rest.service';

export interface Abstelle {
  id: string;
  abprofile: string;
}

@Injectable()
export class AbStelleService extends BasicRestService<Abstelle> {

  protected api = 'level';

  constructor(protected http: Http) {
    super();
  }

  /**
   * This function returns the data of ab-stelle services matching with the level
   * @param level {number}
   * @returns {Observable<R|T>}
   */
  public getAbStelle(level): Observable<[Abstelle]> {
    return this.get(`${level}abstelle`);
  }
}


