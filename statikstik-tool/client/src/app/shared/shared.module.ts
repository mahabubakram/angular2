import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MyDatePickerModule} from 'mydatepicker';
import {SelectModule} from 'ng2-select';
import {BsDropdownModule, DatepickerModule} from 'ngx-bootstrap';
import {CoreModule} from '../core/core.module';
import {DateComponent} from './components/date-component/date.component';
import {DropdownComponent} from './components/dropdown-component/dropdown.component';
import {ErrorComponent} from './components/error-component/error.component';
import {RadioComponent} from './components/radio-component/radio.component';
import {PopupDatePicker} from "./components/popup-date-component/popup-date.component";

@NgModule({
  declarations: [
    RadioComponent,
    DateComponent,
    DropdownComponent,
    ErrorComponent,
    PopupDatePicker],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CoreModule,
    SelectModule,
    MyDatePickerModule,
    BsDropdownModule.forRoot(),
    DatepickerModule.forRoot(),
    FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,

    RadioComponent,
    DateComponent,
    DropdownComponent,
    ErrorComponent,
    PopupDatePicker
  ]
})
export class SharedModule {
}
