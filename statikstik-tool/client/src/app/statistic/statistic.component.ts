import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import {Observable} from 'rxjs/Observable';
import {textList} from '../core/list-of-text';
import {Abfrage} from '../core/services/abfrage.service';
import {Ergaenzende} from '../core/services/ergaenzende.service';
import {OutputFormat} from '../core/services/output-format.service';
import {Report} from '../core/services/report.service';
import {Suchzeitraum} from '../core/services/such-zeitraum.service';
import {UtilityFunctions} from '../core/utility';
import {Statistic} from './statistic-data-resolver.service';

@Component({
  selector   : 'st-app-statistic',
  moduleId   : module.id,
  templateUrl: './statistic.component.html',
  styleUrls  : ['./statistic.component.css'],

})

export class HeroListComponent implements OnInit {
  heroes: string[];

  constructor (private heroService: Abfrage) {}

  ngOnInit() { this.getHeroes(); }

  getHeroes() {
    this.heroService.getHeroes()
      .subscribe(
        heroes => this.heroes = heroes,
        error =>  this.errorMessage = <any>error);
  }

}


export class StatisticComponent implements OnInit {

  public serviceResult: Observable<Statistic>;
  public listOfTexts: any   = textList;
  public submitted: boolean = false;
  public statisticForm: FormGroup;
  public formConfiguration  = {
    query       : {
      groupName  : 'queryTypeGroup',
      controlName: 'queryType',
    },
    report      : {
      groupName  : 'reportTypeGroup',
      controlName: 'reportType',
    },
    service     : {
      groupName  : 'serviceTypeGroup',
      controlName: 'serviceType',
    },
    outputFormat: {
      groupName  : 'outputFormatGroup',
      controlName: 'outputFormat',
    },
    dateType    : {
      searchScope        : {
        groupName  : 'dateTypeGroup',
        controlName: 'searchScope',
      },
      dateTypeWeek       : {
        groupName     : 'dateTypeGroup',
        controlName   : 'dateTypeWeek',
        dateFormat    : 'MM.dd.yyyy',
        datepickerMode: 'day',
        dateEvent     : 'week',
      },
      dateTypeMonth      : {
        groupName     : 'dateTypeGroup',
        controlName   : 'dateTypeMonth',
        dateFormat    : 'MMMM.yyyy',
        datepickerMode: 'month',
      },
      dateTypeFrom       : {
        groupName     : 'dateTypeGroup',
        controlName   : 'dateTypeFrom',
        dateFormat    : 'MM.dd.yyyy',
        datepickerMode: 'day',
      },
      dateTypeTo         : {
        groupName     : 'dateTypeGroup',
        controlName   : 'dateTypeTo',
        dateFormat    : 'MM.dd.yyyy',
        datepickerMode: 'day',
      },
      dateTypeWeekdays   : {
        groupName  : 'dateTypeGroup',
        controlName: 'dateTypeWeekdays',
      },
      dateTypeWorkingdays: {
        groupName  : 'dateTypeGroup',
        controlName: 'dateTypeWorkingdays',
      },
    },
  };

  public abfragen: Observable<[Abfrage]>;
  public reports: Observable<[Report]>;
  public searchScopes: Observable<[Suchzeitraum]>;
  public workingDays: Observable<number>;
  public ergaenzende: Observable<[Ergaenzende]>;
  public outputFormats: Observable<[OutputFormat]>;
  private showOnSpecificReportSelect: boolean = false;
  private showtimeRangeOption: boolean        = false;

  /**
   * The constructor for the whole component
   */
  constructor(private utility: UtilityFunctions, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.serviceResult = this.route.data.pluck('statisticData').map((serviceResult: Statistic) => {
      const role        = 500;
      const workingDays = this.utility.listOfWorkingDays();
      return Object.assign({}, serviceResult, {role, workingDays});
    });

    this.abfragen      = this.serviceResult.pluck('abfragen');
    this.reports       = this.serviceResult.pluck('reports');
    this.searchScopes  = this.serviceResult.pluck('searchScopes');
    this.ergaenzende   = this.serviceResult.pluck('ergaenzende');
    this.outputFormats = this.serviceResult.pluck('outputFormats');
    this.workingDays   = this.serviceResult.pluck('workingDays');
  }

  ngOnInit() {
    this.statisticForm = this.createStatisticForm();
  }

  /**
   * This function checks whether the role is for developer or not.
   * @returns {boolean} defines the role and return the true or false.
   */
  isDeveloper(): Observable<boolean> {
    const is500 = (role: number) => role === 500;

    return this.serviceResult.pluck('role').map(is500);
  }


  onSubmit(value) {
    this.submitted = true;
    console.log('submit');
    console.log(value);
    console.log(this.statisticForm.value);
    console.log(this.statisticForm.valid);
    console.log((<FormGroup>this.statisticForm.controls['queryTypeGroup']).controls['queryType'].errors);
  }

  /**
   * This function changes the value which form fields to show when report radio button is clicked
   * @param {Object} value is the json object value of the report radio section
   */
  onPropertyChange(value) {
    if (value.value === 5) {
      this.showOnSpecificReportSelect = true;
      this.showtimeRangeOption        = false;
    } else if (value.value === 9) {
      this.showtimeRangeOption        = true;
      this.showOnSpecificReportSelect = false;
    } else {
      this.showOnSpecificReportSelect = false;
      this.showtimeRangeOption        = false;
    }
  }

  /**
   * Funtion to creates FormGroup object for the form building in reactive forms
   */
  private createStatisticForm() {
    return this.formBuilder.group({
      carrierAndJobGroup: this.formBuilder.group({}),
      queryTypeGroup    : this.formBuilder.group({
        queryType: ['', [Validators.required]],
      }),
      reportTypeGroup   : this.formBuilder.group({
        reportType: ['', [Validators.required]],
      }),
      dateTypeGroup     : this.formBuilder.group({
        dateTypeWeek       : ['', [Validators.required]],
        dateTypeMonth      : ['', [Validators.required]],
        dateTypeFrom       : ['', [Validators.required]],
        dateTypeTo         : ['', [Validators.required]],
        dateTypeWeekdays   : ['alle', [Validators.required]],
        dateTypeWorkingdays: [0, [Validators.required]],
        searchScope        : ['', [Validators.required]],
      }),
      serviceTypeGroup  : this.formBuilder.group({
        serviceType: ['', [Validators.required]],
      }),
      outputFormatGroup : this.formBuilder.group({
        outputFormat: ['', [Validators.required]],
      }),
    });
  }
}
