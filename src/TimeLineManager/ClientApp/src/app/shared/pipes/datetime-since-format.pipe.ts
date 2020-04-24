import { Pipe, PipeTransform } from '@angular/core';
import { timeSince } from 'src/app/core/base/helpers';

@Pipe({
  name: 'datetimeSinceFormat'
})
export class DatetimeSinceFormatPipe implements PipeTransform {

  transform(value: number, ...args: any[]): string {
    if (!value) { return ''; }
    return timeSince(new Date(value));
  }

}
