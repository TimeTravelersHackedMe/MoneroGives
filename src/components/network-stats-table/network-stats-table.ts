import { Component, Input, HostListener, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';

import { NetworkStats } from '../../constants/interfaces';

@Component({
  selector: 'network-stats-table',
  templateUrl: 'network-stats-table.html'
})
export class NetworkStatsTableComponent implements OnInit {
  @Input('networkStats') network: NetworkStats;
  @ViewChild('hashColumn') hashColumn: any;
  @ViewChild('table') table: any;
  public hashColumnWidth: number = 0;
  public overlayMaxWidth: number = 0;

  constructor() {}

  getTimeFound() {
    return moment(new Date(this.network.timestamp * 1000)).fromNow();
  }

  handleHashOverlay() {
    this.hashColumnWidth = this.hashColumn.nativeElement.clientWidth;
    this.overlayMaxWidth = this.table.nativeElement.clientWidth - this.hashColumn.nativeElement.offsetLeft;
    console.log(this.hashColumnWidth);
    console.log(this.overlayMaxWidth);
    console.log(this.table.nativeElement.clientWidth);
    console.log(this.hashColumn.nativeElement.offsetLeft);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.handleHashOverlay();
  }
  
  ngOnInit() {
    this.handleHashOverlay();
  }

}
