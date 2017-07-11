import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {textList} from '../../../core/list-of-text';

@Component({
  selector: 'st-error-component',
  moduleId: module.id,
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  @Input()
  public formInput: AbstractControl;

  @Input()
  public nameOfFormControl: string;

  @Input()
  public submitted: boolean;

  public listOfTexts = textList;

  ngOnInit() {
    console.log('ngOnInit - ErrorComponent');
  }

  get hasRequiredError() {
    return this.formInput.hasError('required');
  }

  get requiredErrorMessage() {
    return `* ${this.nameOfFormControl} ${this.listOfTexts.errors.required}`;
  }

  isSubmittedAndRequiredError() {
    return (this.submitted && this.hasRequiredError);
  }

  isTouchedAndRequiredError() {
    return (this.hasRequiredError &&
    this.formInput.touched);
  }


}
