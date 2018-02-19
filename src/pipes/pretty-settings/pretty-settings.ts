import { Pipe, PipeTransform } from '@angular/core';

import { SETTINGS } from '../../constants/settings';

@Pipe({
  name: 'prettySettings',
})
export class PrettySettingsPipe implements PipeTransform {

  transform(value: string, ...args) {
    return SETTINGS[value].title;
  }
}
