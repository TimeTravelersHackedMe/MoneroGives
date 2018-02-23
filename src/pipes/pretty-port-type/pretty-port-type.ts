import { Pipe, PipeTransform } from '@angular/core';

import { PORT_TYPES } from '../../constants/settings';

@Pipe({
  name: 'prettyPortType',
})
export class PrettyPortTypePipe implements PipeTransform {

  transform(value: string) {
    return PORT_TYPES[value];
  }
}
