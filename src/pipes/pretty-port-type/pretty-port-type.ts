import { Pipe, PipeTransform } from '@angular/core';

import { PORT_TYPES } from '../../constants/settings';

/**
 * Generated class for the PrettyPortTypePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'prettyPortType',
})
export class PrettyPortTypePipe implements PipeTransform {

  transform(value: string) {
    return PORT_TYPES[value];
  }
}
