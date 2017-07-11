import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';


export class BasicRestService<T> {

  protected host = 'https://drv-mock-services.eu-de.mybluemix.net/api/';//'https://drv-mock-services.eu-de.mybluemix.net/api/';
  protected http: Http;
  protected api = '';

  protected get(url = ''): Observable<[T]> {
    return this.http.get((`${this.host}${this.api}${url}`))
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(this._handleError(error)));
  }

  private _handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return Observable.throw(error.message || error);
  }
}
