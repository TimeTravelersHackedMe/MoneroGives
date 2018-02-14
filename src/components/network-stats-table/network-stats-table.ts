import { Component, Input } from '@angular/core';
import * as moment from 'moment';

import { NetworkStats } from '../../constants/interfaces';

@Component({
  selector: 'network-stats-table',
  templateUrl: 'network-stats-table.html'
})
export class NetworkStatsTableComponent {
  @Input('networkStats') network: NetworkStats;

  constructor() {}

  getTimeFound() {
    return moment(new Date(this.network.timestamp * 1000)).fromNow();
  }

}
