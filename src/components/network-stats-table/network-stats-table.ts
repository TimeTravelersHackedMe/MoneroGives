import { Component, Input } from '@angular/core';

import { NetworkStats } from '../../constants/interfaces';

@Component({
  selector: 'network-stats-table',
  templateUrl: 'network-stats-table.html'
})
export class NetworkStatsTableComponent {
  @Input('networkStats') networkStats: NetworkStats;

  constructor() {}

}
