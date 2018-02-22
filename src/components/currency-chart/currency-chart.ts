import { Component, Input, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'currency-chart',
  templateUrl: 'currency-chart.html'
})
export class CurrencyChartComponent implements AfterViewInit, OnDestroy {
  @Input('coin') coin: string = 'XMR';
  @Input('fiats') fiats: string = 'USD';
  @Input('hours') hours: number = 72;
  @ViewChild('chartCanvas') canvas;
  private data: Array<object> = [];
  public chart: Chart;
  private coinHistory$: Subscription;

  constructor(private dataProvider: DataProvider) {
    this.coinHistory$ = this.dataProvider.hourlyCoinHistory(this.coin, this.fiats, this.hours).subscribe((data: any) => {
      this.data = data.Data.map(item => { return { x: new Date(item.time * 1000), y: item.close } });
      this.update();
    });
  }

  initChart() {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'line',
      data: {
        datasets: [{
          data: this.data,
          backgroundColor: 'rgba(255,255,255,0.430)'
        }]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          bodyFontSize: '24',
          displayColors: false,
          bodyFontStyle: 'bold',
          callbacks: {
            label: (tooltipItem, data) => {
              return tooltipItem.yLabel;
            },
            title: (data) => {
              return moment(data[0].xLabel).format('dddd hA') + ' (' + moment(data[0].xLabel).fromNow() + ')';
            }
          }
        },
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'linear',
            ticks: {
              fontColor: 'rgba(255,255,255,0.667)'
            },
            time: {
              displayFormats: {
                hour: 'ddd hA'
              },
              stepSize: 5,
              unit: 'hour'
            }
          }],
          yAxes: [{
            type: 'linear',
            ticks: {
              callback: (value) => {
                return value;
              },
              fontColor: 'rgba(255,255,255,0.667)',
            }
          }]
        }
      }
    });
  }

  update() {
    if(!this.chart) {
      this.initChart();
    }
    this.chart.data.datasets[0].data = this.data;
    this.chart.update();
  }

  ngAfterViewInit() {
    this.update();
  }

  ngOnDestroy() {
    this.coinHistory$.unsubscribe();
  }

}
