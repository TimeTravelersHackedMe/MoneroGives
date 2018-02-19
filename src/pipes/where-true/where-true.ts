import { Pipe, PipeTransform } from '@angular/core';

import { SETTINGS } from '../../constants/settings';

@Pipe({
  name: 'whereTrue',
})
export class WhereTruePipe implements PipeTransform {

  transform(values: any[], ...args) {
    return values.filter(item => {
      return SETTINGS[item.id][args[0]] === true;
    });
  }
}
