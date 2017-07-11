import {Injectable} from '@angular/core';
import * as R from 'ramda';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UtilityFunctions {

  /**
   * This function returns the number of week from the timeStamp
   * @param dateTimeStamp, param is the timestamp string or timestamp object. mostly can be said from which Date can be generated
   * @returns returns the number of week
   */
  getWeek(dateTimeStamp) {
    const date               = new Date(dateTimeStamp);
    const dateFirstOfTheYear = new Date(date.getFullYear(), 0, 1);
    const milliSecondsInDay  = 86400000;
    const week               = Math.ceil((((date.getTime() - dateFirstOfTheYear.getTime()) / milliSecondsInDay) + dateFirstOfTheYear.getDay() + 1) / 7);
    return week;
  }


  /**
   * This function returns the number of month from the timestamp
   * @param dateTimeStamp
   * @param dateTimeStamp, param is the timestamp string or timestamp object. mostly can be said from which Date can be generated
   * @returns returns the number of month. month calculation starts from 0 and ends 11 but we will return from 1-12.
   */
  getMonth(dateTimeStamp) {
    const date = new Date(dateTimeStamp);
    return date.getMonth() + 1;// as counting of the month starts from 0 and ends at 11.
  }

  /**
   * This function custom groups the data of the dropdown field based on the first letter.
   * @param data {[Array]}
   * @param key {string}
   */
  dropdownGroupBuilder(data, key): Observable<[{ id: number, text: string }]> {
    const firstLetter                 = abStelle => abStelle[key].charAt(0).toUpperCase();
    const createDropDownChild         = ({id, [key]: text}) => Object.assign({id, text});
    const createDropDownObject        = abStelle => Object.assign({
      id      : Date.now(),
      text    : firstLetter(abStelle),
      children: [createDropDownChild(abStelle)],
    });
    const isArray                     = R.is(Array);
    const combineChildren             = (destValues, srcValues) => isArray(destValues) && isArray(srcValues) ? R.concat(destValues, srcValues) : srcValues;
    const createDropDownObjects       = R.map(createDropDownObject);
    const mergeGroupedDropDownObjects = R.reduce(R.mergeWith(combineChildren), {});

    const toDropDownGroupObjects = R.compose(
      R.values,
      R.map(mergeGroupedDropDownObjects),
      R.map(createDropDownObjects),
      R.groupBy(firstLetter),
      R.sortBy(R.prop(key)),
    );

    return data
      .map(toDropDownGroupObjects);
  }

  /**
   * returns a monthly working days
   * @returns {any}
   */
  listOfWorkingDays(): [number] {
    return Array(31).fill(0).reduce(arr => {
      arr.push(arr.length);
      return arr;
    }, []);
  }


}
