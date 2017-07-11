import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as R from 'ramda';
import {Observable} from 'rxjs/Observable';
import {textList} from '../../core/list-of-text';
import {Abstelle} from '../../core/services/ab-stelle.service';
import {Traeger} from '../../core/services/traeger.service';
import {UtilityFunctions} from '../../core/utility';
import {Statistic} from '../statistic-data-resolver.service';

@Component({
  selector   : 'st-carrier-services',
  moduleId   : module.id,
  templateUrl: './carrier-services.component.html',
})
export class CarrierAndServicesComponent implements OnInit {
  @Input()
  public parentFormGroup: FormGroup;

  @Input()
  public data: Observable<Statistic>;

  public listOfTexts = textList;
  public abstelleData: Observable<[Abstelle]>;
  public traegerData: Observable<[Traeger]>;

  public abStelleGroupedData: any;
  public firstAbStelleGroupedData: Observable<any>;

  constructor(private utility: UtilityFunctions) {
  }

  ngOnInit() {
    console.log('ngOnInit - CarrierAndServicesComponent');
    const asArray                       = firstAbStelleChild => [firstAbStelleChild];
    const getChildren                   = R.prop('children');
    const getFirstChild                 = R.compose(
      R.head,
      getChildren
    );
    const getFirstItemOfAbStelleGrouped = R.compose(
      asArray,
      getFirstChild,
      R.head
    );

    this.traegerData  = this.data.pluck('traeger');
    this.abstelleData = this.data.pluck('abStellen');

    this.abStelleGroupedData = this.utility.dropdownGroupBuilder(this.abstelleData, 'abprofile ');

    this.firstAbStelleGroupedData = this.abStelleGroupedData
      .map(getFirstItemOfAbStelleGrouped);

    this.traegerData.subscribe(([firstTraeger]) => (<FormGroup>this.parentFormGroup.controls['carrierAndJobGroup'])
      .addControl('carrier', new FormControl(firstTraeger.institution, [Validators.required])));

    this.firstAbStelleGroupedData.subscribe(([firstAbStelleChild]) => (<FormGroup>this.parentFormGroup.controls['carrierAndJobGroup'])
      .addControl('job', new FormControl(firstAbStelleChild.text, [Validators.required])),
    );
  }

  /**
   * This function is triggered when selection value in the dropdown is changed
   * @param {object} value is the value of the fropdown selection
   */
  public selected(value: any): void {
    console.log(value);
    (<FormGroup>this.parentFormGroup.controls['carrierAndJobGroup']).controls['job'].patchValue(value.text);
  }


}
