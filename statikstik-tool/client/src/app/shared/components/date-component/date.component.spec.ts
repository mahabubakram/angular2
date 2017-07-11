import {DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {expect} from 'chai';
import {MyDatePickerModule} from 'mydatepicker';
import {UtilityFunctions} from '../../../core/utility';
import {ErrorComponent} from '../error-component/error.component';

import {DateComponent} from './date.component';

let dateComponent: DateComponent;
let fixture: ComponentFixture<DateComponent>;
let debugElement: DebugElement;
let element: HTMLInputElement;

const testDate = {year: 2017, month: 5, day: 9};

describe('DateComponent', () => {
  beforeEach(setupTestBed);
  beforeEach(setupComponent);

  describe('creation of component', () => {
    beforeEach(getComponentHtmlElement);

    it('should be created successfully', shouldBeCreatedSuccessfully);
  });

  describe('should include a name', () => {
    beforeEach(getComponentLabelHtmlElement);

    it('should has been queries successfully', shouldHasBeenQueriesSuccessfully);
    it('should have name test', shouldHaveNameTest);
  });

  describe('should format week', () => {
    beforeEach(setupMyDatePickerComponent);

    it('should has been queries successfully', shouldHasBeenQueriesSuccessfully);
    it('should be empty', shouldBeEmpty);
    it('should contain 2017-05-09', shouldContain09052017);
    it('should contain week number', shouldContainWeekNumber);
  });

  function setupTestBed() {
    return TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MyDatePickerModule],
      declarations: [DateComponent, ErrorComponent],
      providers: [UtilityFunctions]
    }).compileComponents();
  }

  function setupComponent() {
    fixture = TestBed.createComponent(DateComponent);
    dateComponent = fixture.componentInstance;
    dateComponent.controlName = 'testDate';
    dateComponent.groupName = 'testGroup';
    dateComponent.parentFormGroup = new FormGroup({
      testGroup: new FormGroup({
        testDate: new FormControl('', Validators.required)
      })
    });
    dateComponent.label = 'test';
    fixture.detectChanges();
  }

  function getComponentHtmlElement() {
    debugElement = fixture.debugElement.query(By.css('.form-horizontal'));
    element = debugElement.nativeElement;
  }

  function getComponentLabelHtmlElement() {
    debugElement = fixture.debugElement.query(By.css('label'));
    element = debugElement.nativeElement;
  }

  function setupMyDatePickerComponent() {
    dateComponent.dateType = 'week';
    dateComponent.selDate = testDate;
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.selection'));
    element = debugElement.nativeElement;
  }

  function shouldBeCreatedSuccessfully() {
    expect(element).to.not.be.null;
  }

  function shouldHaveNameTest() {
    fixture.detectChanges();
    return element.textContent.should.be.equal('test:');
  }

  function shouldContainWeekNumber() {
    dateComponent.onCalendarChanged({date: testDate, jsdate: new Date(2017, 5, 9, 0, 0, 0, 0), formatted: '', epoc: 0});
    return dateComponent.myOptions.dateFormat.should.equal('23 - dd.mm.yyyy');
  }

  function shouldContain09052017() {
    return element.value.should.equal('2017-05-09');
  }

  function shouldBeEmpty() {
    return element.textContent.should.be.empty;
  }

  function shouldHasBeenQueriesSuccessfully() {
    expect(element).to.not.be.null;
  }
});

