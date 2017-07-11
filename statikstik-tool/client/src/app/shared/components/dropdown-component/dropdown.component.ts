import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'st-dropdown-component',
  moduleId: module.id,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

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

  public dropdownFormControl: AbstractControl;

  ngOnInit() {
    // console.log('ngOnInit - DropdownComponent');
    this.dropdownFormControl = (<FormGroup>this.parentFormGroup.controls[this.groupName]).controls[this.controlName];
  }

}
