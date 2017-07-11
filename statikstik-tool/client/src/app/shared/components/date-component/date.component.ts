import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {IMyDate, IMyDateModel, IMyOptions} from 'mydatepicker';
import {UtilityFunctions} from '../../../core/utility';

@Component({
  selector: 'st-date-component',
  moduleId: module.id,
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

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
  public dateType: string;

  public selDate: IMyDate;

  public placeholder: string = 'Select a date';

  public dateFormControl: AbstractControl;

  /**
   * This object detonates the options of the datepicker
   */
  public myOptions: IMyOptions = {
    showWeekNumbers: true,
    todayBtnTxt: 'Today',
    firstDayOfWeek: 'mo',
    showClearDateBtn: true,
    openSelectorTopOfInput: true,
    showSelectorArrow: true,
    openSelectorOnInputClick: false,
    editableDateField: true,
    inline: false
  };

  constructor(private utility: UtilityFunctions) {

  }

  ngOnInit(): void {
    // console.log('ngOnInit - DateComponent');
    this.dateFormControl = (<FormGroup>this.parentFormGroup.controls[this.groupName]).controls[this.controlName];
  }

  /**
   * Function triggers when date field is changed to change the view format of the date
   * @param event
   */
  onCalendarChanged(event: IMyDateModel) {
    // if not null, it means it will execute if clear button (X) is pressed.
    // in the clear button press it will simply remove the date and show the placeholder.
    if (event.jsdate) {
      this.dateFormControl.patchValue(event.date);
      this.formatDate(event.jsdate);
      this.selDate = event.date;
    }
  }

  /**
   * Functions formats the date format depend upon which date field is being touched.
   * @param date
   */
  formatDate(date: Date) {
    if (this.dateType === 'week') {
      this.myOptions.dateFormat = this.utility.getWeek(date) + ' - ' + 'dd.mm.yyyy';
    } else if (this.dateType === 'month') {
      this.myOptions.dateFormat = this.utility.getMonth(date) + ' - ' + 'mmm.yyyy';
    } else {
      this.myOptions.dateFormat = 'dd.mm.yyyy';
    }
  }

}
