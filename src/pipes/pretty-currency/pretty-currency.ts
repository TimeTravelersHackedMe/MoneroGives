import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyCurrency',
})
export class PrettyCurrencyPipe implements PipeTransform {

  transform(value: string, ...args) {
    const fiat = args[0];
    if(fiat === 'USD') {
      if(parseFloat(value) < 100) {
        return '$' + parseFloat(value).toFixed(2);
      } else {
        return '$' + value;
      }
    } else if(fiat === 'BTC') {
      return parseFloat(value).toFixed(4) + 'BTC';
    } else if(fiat === 'EUR') {
      if(parseFloat(value) < 100) {
        return '€' + parseFloat(value).toFixed(2);
      } else {
        return '€' + value;
      }
    } else {
      return value;
    }
  }
}
