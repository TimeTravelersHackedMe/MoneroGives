import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'xmr',
})
export class XmrPipe implements PipeTransform {

  transform(amount: number) {
    return amount / 1000000000000;
  }
}
