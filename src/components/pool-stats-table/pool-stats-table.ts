import { Component, Input, HostListener, ViewChild } from '@angular/core';

import { PoolStats, Block } from '../../constants/interfaces';

@Component({
  selector: 'pool-stats-table',
  templateUrl: 'pool-stats-table.html'
})
export class PoolStatsTableComponent {
  @Input('poolStats') pool: PoolStats;
  @Input('firstBlock') firstBlock: Block;
  @ViewChild('hashColumn') hashColumn: any;
  @ViewChild('table') table: any;
  public hashColumnWidth: number;
  public overlayMaxWidth: number;
  public poolType: string = 'PPLNS';

  constructor() { }

  handleHashOverlay() {
    this.hashColumnWidth = this.hashColumn.nativeElement.clientWidth;
    this.overlayMaxWidth = this.table.nativeElement.clientWidth - this.hashColumn.nativeElement.offsetLeft;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.handleHashOverlay();
  }

  ngOnInit() {
    this.handleHashOverlay();
  }
}