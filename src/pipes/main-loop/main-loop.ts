import { Pipe, PipeTransform } from '@angular/core';

import { SETTINGS } from '../../constants/settings';

@Pipe({
  name: 'mainLoop',
})
export class MainLoopPipe implements PipeTransform {

  transform(values: any[], ...args) {
    return values.filter(item => {
      return SETTINGS[item.id].mainLoop !== false;
    });
  }
}
