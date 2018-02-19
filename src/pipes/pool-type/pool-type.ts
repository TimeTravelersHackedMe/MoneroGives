import { Pipe, PipeTransform } from '@angular/core';

import { SETTINGS } from '../../constants/settings';

@Pipe({
  name: 'poolType',
})
export class PoolTypePipe implements PipeTransform {
  
  transform(values: any[], ...args) {
    return values.filter(item => {
      return SETTINGS[item.id].poolType === true;
    });
  }
}
