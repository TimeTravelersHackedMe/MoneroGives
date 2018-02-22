import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hasLength',
})
export class HasLengthPipe implements PipeTransform {

  transform(values: any[], ...args) {
    return values.length > 0;
  }
}
