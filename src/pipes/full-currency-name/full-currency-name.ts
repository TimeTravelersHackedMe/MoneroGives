import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullCurrencyName',
})
export class FullCurrencyNamePipe implements PipeTransform {

  transform(value: string, ...args) {
    if (value === 'AEON') {
      return 'Aeon';
    } else if (value === 'ETN') {
      return 'Electroneum';
    } else if (value === 'SUMO') {
      return 'Sumokoin';
    } else if (value === 'XMR') {
      return 'Monero';
    } else {
      return 'Unknown';
    }
  }
}
