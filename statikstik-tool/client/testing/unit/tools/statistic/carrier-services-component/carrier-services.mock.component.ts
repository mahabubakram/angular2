import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Statistic} from '../../../../../src/app/statistic/statistic-data-resolver.service';


@Component({
  selector: 'st-carrier-services',
  moduleId: module.id,
  template: '',
})
export class CarrierAndServicesMockComponent implements OnInit {
  @Input()
  public parentFormGroup: FormGroup;

  @Input()
  public data: Observable<Statistic>;

  ngOnInit() {
    console.log('ngOnInit - CarrierAndServicesMockComponent');
  }

}
