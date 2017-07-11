import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'time'})
export class TimePipe implements PipeTransform {
  transform(value: Date): String {
    if(!value)
      return;

    let hh = (value.getHours() < 10) ? '0' + value.getHours() : value.getHours();
    let mm = (value.getMinutes() < 10) ? '0' + value.getMinutes() : value.getMinutes();
    let ss = (value.getSeconds() < 10) ? '0' + value.getSeconds() : value.getSeconds();
    let ms = value.getMilliseconds().toString();
      
    return hh + ":" + mm + ":" + ss + "." +  ms.substring(0, 1);
  }
}
