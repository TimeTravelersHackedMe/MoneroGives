import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'where',
})
export class WherePipe implements PipeTransform {

  transform(values: any[], ...args) {
    return values.filter(item => {
      let yes = true;
      for(const arg of args) {
        let z = false;
        for(const value of arg.value) {
          z = item[arg.id] === value;
          if(z) break;
        }
        yes = z && yes;
      }
      return yes;
    });
  }
}
