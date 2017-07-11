import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RestService {
  private restHost = 'http://localhost:8080/';
  private baseCloudantUrl = 'api/cloud';

  private bluemixHost = 'https://hilscher-node-red.eu-gb.mybluemix.net/';
  private bluemixUrl = 'demand';

  constructor(private http: Http) {
  }

  public getCloudantDocs(indexToSearch, sensorType): Observable<[any]> {
    let params = new URLSearchParams();
    params.set('index', indexToSearch);
    params.set('sensor', sensorType);

    return this.http.get((this.restHost + this.baseCloudantUrl), {search: params})
    // ...and calling .json() on the response to return data
      .map((res) => res.json())
      //...errors if any
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  public demandLatencyCheck(sensorType): Observable<[any]> {
    this.bluemixUrl = sensorType;

    return this.http.post(this.bluemixHost + this.bluemixUrl, {})
    // ...and calling .json() on the response to return data
      .map((res) => res.json())
      //...errors if any
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  public getLastEvent(sensorType): Observable<[any]> {
    let params = new URLSearchParams();
    params.set('sensor', sensorType);

    this.baseCloudantUrl = 'api/last-event';

    return this.http.get((this.restHost + this.baseCloudantUrl), {search: params})
    // ...and calling .json() on the response to return data
      .map((res) => res.json())
      //...errors if any
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  private _handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
