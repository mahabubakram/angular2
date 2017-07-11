import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'st-dashboard',
  moduleId: module.id,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title: string;

  constructor() {
    this.title = 'Ein Dashboard Hier';
  }

  ngOnInit() {
    console.log('ngOnInit - DashboardComponent');
  }

}
