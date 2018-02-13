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
  @ViewChild('chartCanvas') canvas;
  private data;
  private time;

  constructor(private hashPipe: HashPipe, private difficultyPipe: DifficultyToHashPipe) { }

  ngOnChanges() {
    moment.relativeTimeThreshold('m', 60);
    moment.relativeTimeThreshold('h', 24 * 26);
    this.data = this.stats.map(x => { return { y: this.difficultyPipe.transform(x[this.selector]), x: new Date(x.updateTime) } });
    console.log(this.data);
    new Chart(this.canvas.nativeElement, {
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
                  return this.hashPipe.transform(value)
                },
                fontColor: 'rgba(255,255,255,0.667)'
              }
            }]
        }
    }
    });
  }


}
