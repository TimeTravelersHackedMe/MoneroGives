import { Component, Input } from '@angular/core';

@Component({
  selector: 'pool-config-table',
  templateUrl: 'pool-config-table.html'
})
export class PoolConfigTableComponent {
  @Input('poolConfigs') parseCookieValue: any;

  constructor() {}

}
