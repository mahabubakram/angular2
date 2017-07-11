import {Component, ViewEncapsulation} from '@angular/core';
import {WebSocketService} from './core/services/webSocket.service';

@Component({
  selector: 'app-root',
  providers: [ WebSocketService],
  moduleId: module.id,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './assets/styles/style.css' ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
