import {Component, Input, ElementRef, OnInit, HostListener} from '@angular/core';
import {FormsModule, FormControl, AbstractControl, FormGroup} from '@angular/forms';
import {DatePipe} from "@angular/common";
import * as moment from 'moment';

@Component({
  selector: 'popup-date',
  host: {
    '(document:click)': 'onClick($event)'
  },
  moduleId: module.id,
  templateUrl: './popup-date.component.html',
  styleUrls: ['./popup-date.component.css']
})
export class PopupDatePicker implements OnInit {

  @Input()
  public parentFormGroup: FormGroup;

  @Input()
  public groupName: string;

  @Input()
  public controlName: string;

  @Input()
  public label: string;

  @Input()
  public submitted: boolean;

  @Input()
  public dateFormatType: string;

  @Input()
  public datepickerMode: string;

  @Input()
  public dateTypeObject: string;

  public placeholder: string = 'Select a date';

  public dateFormControl: AbstractControl;

  private showDatepicker: boolean = false;
  //The first potion of the date Event is named Stage1
  public formattedDatePart1: number;
  //The second portion of the date event is named stage2
  public formattedDatePart2: string;

  constructor(private _eref: ElementRef, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.dateFormControl = (<FormGroup>this.parentFormGroup.controls[this.groupName]).controls[this.controlName];
  }

  togglePopup() {
    this.showDatepicker = !this.showDatepicker;
  }

  //onClick in anywhere in the page
  onClick(event) {
    this.calculateFormattedDateStage1();
    if (!this._eref.nativeElement.contains(event.target)) {
      if(this.showDatepicker){
        this.formattedDatePart2 = this.datePipe.transform(this.dateFormControl.value, this.dateFormatType);
        this.showDatepicker = false;
      }
    }
  }

  /**
   * This function decides whether to show the first portion of the date Event or not
   * @returns {boolean}
   */
  showFormattedStage1(){
    if(this.formattedDatePart1 && !isNaN(this.formattedDatePart1)){
      return true;
    }
    return false;
  }

  /**
   * This function calculates the first portion what to show
   */
  calculateFormattedDateStage1(){

    this.parentFormGroup.valueChanges.subscribe((formData) =>{
      if(this.dateTypeObject === 'week'){
        let tempDate = moment(formData.dateTypeGroup.dateTypeWeek, "MM-DD-YYYY");
        this.formattedDatePart1 = tempDate.isoWeek();
      }

      if(this.dateTypeObject === 'month'){
        let tempDate = moment(formData.dateTypeGroup.dateTypeMonth, "MMMM.YYYY");
        this.formattedDatePart1 = tempDate.month() + 1;
      }

    });
  }

}
