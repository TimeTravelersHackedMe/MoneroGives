import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';

import { HashPipe } from '../../pipes/hash/hash';
import { DifficultyToHashPipe } from '../../pipes/difficulty-to-hash/difficulty-to-hash';

@Component({
  selector: 'card-chart',
  templateUrl: 'card-chart.html'
})
export class CardChartComponent implements OnChanges {
  @Input('data') stats: Array<any>;
  @Input('selector') selector: string;
  @Input('isHashRate') isHashRate: boolean = false;
  @ViewChild('chartCanvas') canvas;
  private data: Array<object> = [];
  public chart: Chart;

  constructor(private hashPipe: HashPipe, private difficultyPipe: DifficultyToHashPipe) { }

  ngOnChanges() {
    if (!this.chart) {
      this.initChart();
    }
    this.chart.data.datasets[0].data = this.stats.map(x => { return { y: this.isHashRate ? this.difficultyPipe.transform(x[this.selector]) : x[this.selector], x: new Date(x.updateTime) } });
    this.chart.update();
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
              return this.isHashRate ? this.hashPipe.transform(tooltipItem.yLabel) : tooltipItem.yLabel;
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
                return this.isHashRate ? this.hashPipe.transform(value) : value;
              },
              fontColor: 'rgba(255,255,255,0.667)',
            }
          }]
        }
      }
    });
  }
}
