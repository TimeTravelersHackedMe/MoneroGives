import { Component, OnDestroy } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';
import { take } from 'rxjs/operators';

import { Luz } from '../../providers/luz/luz';
import { CONFIG } from '../../constants/config';
import { Block, NetworkStats, PoolStats, PoolConfigs } from '../../constants/interfaces';

@IonicPage({
  name: 'dashboard',
  segment: 'dashboard'
})
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage implements OnDestroy {
  private networkStatsDoc: AngularFirestoreDocument<NetworkStats>;
  private networkStats$: Subscription;
  public networkStats: NetworkStats = localStorage.getItem('networkStats') === null ? null : JSON.parse(localStorage.getItem('networkStats'));
  private poolStatsDoc: AngularFirestoreDocument<PoolStats>;
  private poolStats$: Subscription;
  public poolStats: PoolStats = localStorage.getItem('poolStats') === null ? null : JSON.parse(localStorage.getItem('poolStats'));
  private poolConfigsDoc: AngularFirestoreDocument<PoolConfigs>;
  private poolConfigs$: Subscription;
  public poolConfigs: PoolConfigs = localStorage.getItem('poolConfigs') === null ? null : JSON.parse(localStorage.getItem('poolConfigs'));
  private networkHistoryCollection: AngularFirestoreCollection<any>;
  private networkHistory$: Subscription;
  public networkHistory: Array<NetworkStats> = localStorage.getItem('networkHistory') === null ? null : JSON.parse(localStorage.getItem('networkHistory'));
  private poolHistoryCollection: AngularFirestoreCollection<any>;
  private poolHistory$: Subscription;
  public poolHistory;
  public firstBlock: Block = localStorage.getItem('firstBlock') === null ? null : JSON.parse(localStorage.getItem('firstBlock'));
  public page;

  constructor(private view: ViewController, private db: AngularFirestore) {
    console.log('history:', this.networkHistory);
    this.page = Luz.getPageParams(this.view.id);
    this.poolStatsDoc = this.db.doc<PoolStats>('pool/stats');
    this.poolStats$ = this.poolStatsDoc.valueChanges().subscribe(data => {
      localStorage.setItem('poolStats', JSON.stringify(data));
      this.poolStats = data;
    });
    this.networkStatsDoc = this.db.doc<NetworkStats>('network/stats');
    this.networkStats$ = this.networkStatsDoc.valueChanges().subscribe(data => {
      localStorage.setItem('networkStats', JSON.stringify(data));
      this.networkStats = data;
    });
    this.poolConfigsDoc = this.db.doc<PoolConfigs>('pool/config');
    this.poolConfigs$ = this.poolConfigsDoc.valueChanges().subscribe(data => {
      localStorage.setItem('poolConfigs', JSON.stringify(data));
      this.poolConfigs = data;
    });
    this.networkHistoryCollection = this.db.collection('network/stats/history', ref => ref.where('historyCount', '==', 50).where('updateTime', '>', new Date().getTime() - CONFIG.networkStats.range));
    this.networkHistory$ = this.networkHistoryCollection.valueChanges().subscribe(data => {
      localStorage.setItem('networkHistory', JSON.stringify(data));
      this.networkHistory = data;
    });
    this.poolHistoryCollection = this.db.collection('pool/stats/history', ref => ref.where('historyCount', '==', 50).where('updateTime', '>', new Date().getTime() - CONFIG.poolStats.range));
    this.poolHistory$ = this.poolHistoryCollection.valueChanges().subscribe(data => {
      localStorage.setItem('poolHistory', JSON.stringify(data));
      this.poolHistory = data;
    });
    this.db.collection('blocks', ref => ref.orderBy('ts', 'desc').limit(1)).valueChanges().pipe(take(1)).subscribe(data => {
      localStorage.setItem('firstBlock', JSON.stringify(data[0]));
      console.log(data[0]);
      this.firstBlock = data[0];
    });
  }


  ngOnDestroy() {
    this.poolConfigs$.unsubscribe();
    this.poolStats$.unsubscribe();
    this.networkStats$.unsubscribe();
    this.networkHistory$.unsubscribe();
    this.poolHistory$.unsubscribe();
  }

}
