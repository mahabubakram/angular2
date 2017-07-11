import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'st-radio-component',
  moduleId: module.id,
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {

  @Input()
  public parentFormGroup: FormGroup;

  @Input()
  public groupName: string;

  @Input()
  public controlName: string;

  @Input()
  public data: [string];

  @Input()
  public label: string;

  @Input()
  public submitted: boolean;

  @Input()
  public hide: boolean;

  @Output() propertyChanged: EventEmitter<string> = new EventEmitter<string>();

  public radioFormControl: AbstractControl;

  ngOnInit() {
    // console.log('ngOnInit - RadioComponent');
    this.radioFormControl = (<FormGroup>this.parentFormGroup.controls[this.groupName]).controls[this.controlName];
  }

  onClick(eventValue) {
    this.propertyChanged.emit(eventValue);
  }


}
