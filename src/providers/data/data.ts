import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CONFIG } from '../../constants/config';

@Injectable()
export class DataProvider {

  constructor(private http: HttpClient) {}

  hourlyCoinHistory(coin: string = 'XMR', convertTo: string = 'USD', hours: number = 72) {
    return this.http.get(CONFIG.exchange + 'histohour?fsym=' + coin + '&tsym=' + convertTo + '&limit=' + hours);
  }
}
