import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class GetReportService {
  private restHost = 'http://localhost:8081/eTerminOperator/rest/report_wartezeitinminutes/reportbirt/';

  constructor(private http: Http) {
  }

  public getETerminReport(): Observable<[any]> {
    let params = new URLSearchParams();

    return this.http.get((this.restHost) + this.ArgumentsToArray(arguments).join('/'))
      .map((res) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  ArgumentsToArray(args) {
    return [].slice.apply(args);
  }

}
