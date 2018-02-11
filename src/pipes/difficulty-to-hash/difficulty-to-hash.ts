import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'difficultyToHash',
})
export class DifficultyToHashPipe implements PipeTransform {

  transform(hashrate: number) {
      return Math.floor(hashrate / 120)
  }
}
