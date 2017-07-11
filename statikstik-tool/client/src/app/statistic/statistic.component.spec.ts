import {DatePipe} from '@angular/common';
import {DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {expect} from 'chai';
import {MyDatePickerModule} from 'mydatepicker';
import {SelectModule} from 'ng2-select';
import {BsDropdownModule} from 'ngx-bootstrap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import {Subject} from 'rxjs/Subject';
import {AbfrageServiceHelper} from '../../../testing/unit/tools/core/services/abfrage.service.helper';
import {CarrierAndServicesMockComponent} from '../../../testing/unit/tools/statistic/carrier-services-component/carrier-services.mock.component';
import {StatisticComponentHelper} from '../../../testing/unit/tools/statistic/statistic.component.helper';
import {UnitTestHelper} from '../../../testing/unit/tools/unit-test.helper';
import {SharedModule} from '../shared/shared.module';
import {Statistic} from './statistic-data-resolver.service';
import {StatisticRoutingModule} from './statistic-routing.module';
import {StatisticComponent} from './statistic.component';

let activatedRouteStub;
let statisticComponent: StatisticComponent;
let fixture: ComponentFixture<StatisticComponent>;
let debugElement: DebugElement;
let element: HTMLInputElement;
let data: Subject<Statistic>;

let queryTypeControl: FormControl;


describe('StatisticComponent', () => {
  beforeEach(setupStubs);
  beforeEach(setupTestBed);
  beforeEach(setupComponent);

  it('component should have been created', componentShouldHaveBeenCreated);

  describe('- queryTypeGroup', () => {
    beforeEach(setupQueryTypeGroup);

    it('initially it should not be valid', initiallyItShouldNotBeValid);

    describe('check values of queryTypeControl', () => {
      beforeEach(setupQueryTypeControl);
      afterEach(resetStatisticForm);

      describe('first value', () => {
        beforeEach(() => {
          debugElement = fixture.debugElement.query(By.css('input[type="radio"][ng-reflect-value="test1"]'));
          element      = debugElement.nativeElement;
        });
        afterEach(() => {
          debugElement = null;
          element      = null;
        });

        it('should select first value', shouldSelectFirstValue);
        it('after selecting first value should be valid', afterSelectingFirstValueShouldBeValid);
      });
      describe('second value', () => {

        it('before selecting second value should be invalid', beforeSelectingSecondValueShouldBeInvalid);
        it('after selecting second value should be valid', afterSelectingSecondValueShouldBeValid);
      });
    });
  });

  function setupStubs() {
    data               = new Subject();
    activatedRouteStub = {
      data: data.asObservable()
    };
  }

  function setupTestBed() {
    return TestBed.configureTestingModule({
      declarations: [
        StatisticComponent,
        CarrierAndServicesMockComponent,
      ],
      imports     : [
        SharedModule,
        MyDatePickerModule,
        BsDropdownModule.forRoot(),
        SelectModule,
        StatisticRoutingModule,
      ],
      providers   : [DatePipe, {
        provide: ActivatedRoute, useValue: activatedRouteStub,
      }],
    }).compileComponents();
  }

  function setupComponent() {
    fixture            = TestBed.createComponent(StatisticComponent);
    statisticComponent = fixture.componentInstance;

    const statistic = StatisticComponentHelper.createEmptyStatistic();

    data.next(statistic);
    fixture.detectChanges();
  }

  function setupQueryTypeGroup() {
    queryTypeControl = UnitTestHelper.getFormControl(statisticComponent.statisticForm, 'queryTypeGroup', 'queryType');
  }

  function setupQueryTypeControl() {
    const statistic    = StatisticComponentHelper.createEmptyStatistic();
    statistic.abfragen = [
      AbfrageServiceHelper.createFilledAbfrage('test1'),
      AbfrageServiceHelper.createFilledAbfrage('test2'),
    ];
    data.next(statistic);
    fixture.detectChanges();
  }

  function resetStatisticForm() {
    statisticComponent.statisticForm.reset();
  }

  function componentShouldHaveBeenCreated() {
    expect(statisticComponent).to.not.be.null;
  }

  function initiallyItShouldNotBeValid() {
    return queryTypeControl.valid.should.be.false;
  }

  function afterSelectingFirstValueShouldBeValid() {
    element.click();
    fixture.detectChanges();
    return queryTypeControl.valid.should.be.true;
  }

  function shouldSelectFirstValue() {
    expect(debugElement).to.not.be.null;
  }

  function beforeSelectingSecondValueShouldBeInvalid() {
    return queryTypeControl.valid.should.be.false;
  }

  function afterSelectingSecondValueShouldBeValid() {
    queryTypeControl.setValue('test2');
    return queryTypeControl.valid.should.be.true;
  }
});
