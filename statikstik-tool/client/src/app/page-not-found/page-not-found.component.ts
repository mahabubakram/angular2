import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'st-page-not-found',
  moduleId: module.id,
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
    console.log('ngOnInit - PageNotFoundComponent');
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

}
