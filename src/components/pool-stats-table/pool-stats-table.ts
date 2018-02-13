import { Component, Input } from '@angular/core';

import { PoolStats } from '../../constants/interfaces';

@Component({
  selector: 'pool-stats-table',
  templateUrl: 'pool-stats-table.html'
})
export class PoolStatsTableComponent {
  @Input('poolStats') pool: PoolStats;

  constructor() {}

}
