import { Component, Input, OnDestroy, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import io from 'socket.io-client';
import { CCC } from '../../shared/ccc-streamer-utilities';

import { DataProvider } from '../../providers/data/data';
import { PrettyCurrencyPipe } from '../../pipes/pretty-currency/pretty-currency';
import { ExchangeSocketMessage } from '../../constants/interfaces';
import { CONFIG } from '../../constants/config';

@Component({
  selector: 'currency-chart',
  templateUrl: 'currency-chart.html'
})
export class CurrencyChartComponent implements OnChanges, OnDestroy, OnInit {
  @Input('coin') coin: string = 'XMR';
  @Input('fiats') fiats: Array<string> = ['USD'];
  @Input('hours') hours: number = 24 * 5;
  @Input('color') color: string = 'primary';
  @Input('title') title: string = 'Default Currency Chart Title';
  @Input('socket') socket: boolean = false;
  @ViewChild('chartCanvas') canvas;
  private data: any = localStorage.getItem('currencyChartData') === null ? [] : JSON.parse(localStorage.getItem('currencyChartData'));;
  private yAxes: any = localStorage.getItem('yAxes') === null ? [] : JSON.parse(localStorage.getItem('yAxes'));
  public chart: Chart;
  private coinHistory$: Array<Subscription> = [];
  private socketConn: any;
  public liveData: any = {};
  public lastLiveData: any = {};
  public trendingUp: any = {};
  private socketSubscriptions: any = [];

  constructor(private dataProvider: DataProvider, public prettyCurrency: PrettyCurrencyPipe) {}

  initChart() {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'line',
      data: {
        datasets: this.data
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
            label: (tooltipItem) => {
              return this.prettyCurrency.transform(tooltipItem.yLabel, this.fiats[tooltipItem.datasetIndex]);
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
          yAxes: this.yAxes
        }
      }
    });
  }

  getLivePrice(coin: string, fiat: string) {
    if (this.liveData[coin + fiat] && this.liveData[coin + fiat].PRICE) {
      return this.liveData[coin + fiat].PRICE;
    } else {
      return false;
    }
  }

  populateChart() {
    const prettyCurrency = this.prettyCurrency;
    for (const fiat of this.fiats) {
    }
  }

  addSeries(fiat: string, index: number) {
    return new Promise((resolve) => {
      const prettyCurrency = this.prettyCurrency;
      const sub = this.dataProvider.hourlyCoinHistory(this.coin, fiat, this.hours).subscribe((data: any) => {
        this.yAxes[index] = {
          id: fiat,
          type: 'linear',
          ticks: {
            callback: function (value) {
              return prettyCurrency.transform(value, this.options.id);
            },
            fontColor: 'rgba(255,255,255,0.667)',
          }
        };
        this.data[index] = {
          data: data.Data.map(item => { return { x: new Date(item.time * 1000), y: item.close } }),
          yAxisID: this.fiats[index],
          backgroundColor: 'rgba(255,255,255,0.24)',
        };
        resolve();
      });
      this.coinHistory$.push(sub);
    });
  }

  renderChart() {
    if (this.chart && this.chart.animating) {
      setTimeout(() => {
        this.renderChart();
      }, 50);
    } else {
      let index = 0;
      let promises = [];
      for (const fiat of this.fiats) {
        promises.push(this.addSeries(fiat, index));
        index++;
      }
      Promise.all(promises).then(() => {
        localStorage.setItem('currencyChartData', JSON.stringify(this.data));
        localStorage.setItem('yAxes', JSON.stringify(this.yAxes));
        if (!this.chart) {
          this.initChart();
        } else {
          for (var i = 0; i < this.fiats.length; i++) {
            this.chart.data.datasets[i] = this.data[i];
          }
          this.chart.update({
            duration: 333
          });
        }
      });
    }
  }

  startSockets() {
    this.socketConn = io('https://streamer.cryptocompare.com/');
    this.socketConn.on('connect', () => {
      console.log('Exchange socket connected.');
    });
    this.socketConn.on('disconnect', () => {
      console.log('Exchange socket disconnected.');
      this.socketConn = false;
    });
  }

  update() {
    this.renderChart();
    if (this.socket) {
      if (!this.socketConn) {
        this.startSockets();
      } else {
        // Doesn't appear to be working... TODO post issue on their Github
        // Issue: https://github.com/cryptoqween/cryptoqween.github.io/issues/15
        this.socketConn.emit('SubRemove', { subs: this.socketSubscriptions });
      }
      //Format: {SubscriptionId}~{ExchangeName}~{FromSymbol}~{ToSymbol}
      //Use SubscriptionId 0 for TRADE, 2 for CURRENT and 5 for CURRENTAGG
      //For aggregate quote updates use CCCAGG as market
      for (const fiat of this.fiats) {
        this.socketSubscriptions.push('5~CCCAGG~' + this.coin + '~' + fiat);
      }
      this.socketConn.emit('SubAdd', { subs: this.socketSubscriptions });
      this.socketConn.on('m', (data) => {
        const messageType = data.substring(0, data.indexOf("~"));
        let socketMessage: ExchangeSocketMessage = {};
        if (messageType == CCC.STATIC.TYPE.CURRENTAGG) {
          socketMessage = CCC.CURRENT.unpack(data);
          const socketData = Object.assign(this.liveData[socketMessage.FROMSYMBOL + socketMessage.TOSYMBOL] || {}, socketMessage);
          if (this.liveData[socketMessage.FROMSYMBOL + socketMessage.TOSYMBOL]) {
            const livePrice = this.liveData[socketMessage.FROMSYMBOL + socketMessage.TOSYMBOL].PRICE;
            if (socketData.PRICE > this.lastLiveData[socketMessage.FROMSYMBOL + socketMessage.TOSYMBOL]) {
              this.trendingUp[socketMessage.FROMSYMBOL + socketMessage.TOSYMBOL] = true;
            } else if (socketData.PRICE < this.lastLiveData[socketMessage.FROMSYMBOL + socketMessage.TOSYMBOL]) {
              this.trendingUp[socketMessage.FROMSYMBOL + socketMessage.TOSYMBOL] = false;
            }
            this.lastLiveData[socketMessage.FROMSYMBOL + socketMessage.TOSYMBOL] = this.liveData[socketMessage.FROMSYMBOL + socketMessage.TOSYMBOL].PRICE;
          }
          this.liveData[socketMessage.FROMSYMBOL + socketMessage.TOSYMBOL] = socketData;
        }
      });
    }
  }

  ngOnInit() {
    if(this.data.length > 0 && this.yAxes.length > 0) {
      this.initChart();
    }
  }

  ngOnChanges() {
    this.update();
  }

  ngOnDestroy() {
    for (const sub of this.coinHistory$) {
      sub.unsubscribe();
    }
  }

}
