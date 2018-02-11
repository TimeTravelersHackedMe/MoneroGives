import { Component, OnDestroy } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';

import { Luz } from '../../providers/luz/luz';
import { NetworkStats, PoolStats, PoolConfigs } from '../../constants/interfaces';

@IonicPage({
  name: 'home',
  segment: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private networkStatsDoc: AngularFirestoreDocument<NetworkStats>;
  private networkStats$: Subscription;
  public networkStats: NetworkStats = localStorage.getItem('networkStats') === null ? {} : JSON.parse(localStorage.getItem('networkStats'));
  private poolStatsDoc: AngularFirestoreDocument<PoolStats>;
  private poolStats$: Subscription;
  public poolStats: PoolStats = localStorage.getItem('poolStats') === null ? {} : JSON.parse(localStorage.getItem('poolStats'));
  private poolConfigsDoc: AngularFirestoreDocument<PoolConfigs>;
  private poolConfigs$: Subscription;
  public poolConfigs: PoolConfigs = localStorage.getItem('poolConfigs') === null ? {} : JSON.parse(localStorage.getItem('poolConfigs'));
  public page;

  constructor(private view: ViewController, private db: AngularFirestore) {
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
  }

  ngOnDestroy() {
    this.poolStats$.unsubscribe();
    this.networkStats$.unsubscribe();
  }

}
