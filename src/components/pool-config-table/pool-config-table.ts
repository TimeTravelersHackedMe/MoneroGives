import { Component, Input } from '@angular/core';

import { PoolConfigs } from '../../constants/interfaces';

@Component({
  selector: 'pool-config-table',
  templateUrl: 'pool-config-table.html'
})
export class PoolConfigTableComponent {
  @Input('poolConfigs') pool: PoolConfigs;

  constructor() {}

}
