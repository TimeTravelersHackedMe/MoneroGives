import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hash',
})
export class HashPipe implements PipeTransform {
  
  transform(hashes: number) {
    if (hashes > 1000000) {
      return Math.floor(hashes / 1000000) + "." + (hashes % 1000000).toString().substring(0, 1) + " MH/s"
    }
    if (hashes > 1000) {
      return Math.floor(hashes / 1000) + "." + (hashes % 1000).toString().substring(0, 1) + " KH/s"
    }
    return ( hashes || 0 ) + " H/s"
  }
}
