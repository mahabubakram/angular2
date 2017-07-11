import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class WebSocketService {

  private actionUrl: string;
  private websocket: any;
  private receivedMsg: any;

  private webSocketUrl: string;

  public sendMessage(text:string){
    this.websocket.send(text);
  }

  public GetInstanceStatus(sensorName): Observable<any>{
    this.webSocketUrl = "wss://hilscher-node-red.eu-gb.mybluemix.net/ws/" + sensorName; //websocket address
    this.websocket = new WebSocket(this.webSocketUrl);
    this.websocket.onopen =  (evt) => {
      console.log('websocket is open');
    };

    return Observable.create(observer=>{
      this.websocket.onmessage = (evt) => { //receiving websocket messages
        observer.next(evt);
      };
    })
      .map(res=>res.data)
      .share();
  }


}
