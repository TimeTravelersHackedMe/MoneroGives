import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ConvertCurrencyPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'convertCurrency',
})
export class ConvertCurrencyPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value;
  }
}
