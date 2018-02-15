import { Component, OnDestroy } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';

import { Luz } from '../../providers/luz/luz';
import { Block } from '../../constants/interfaces';

@IonicPage({
  name: 'payments',
  segment: 'payments'
})
@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html',
})
export class PaymentsPage implements OnDestroy {
  private paymentsCollection: AngularFirestoreCollection<Block>;
  private payments$: Subscription;
  public payments: Array<Block> = localStorage.getItem('payments') === null ? null : JSON.parse(localStorage.getItem('payments'));;
  public page;

  constructor(private view: ViewController, private db: AngularFirestore) {
    this.page = Luz.getPageParams(this.view.id);
    this.paymentsCollection = this.db.collection('payments', ref => ref.orderBy('ts').limit(30));
    this.payments$ = this.paymentsCollection.valueChanges().subscribe(res => {
      localStorage.setItem('payments', JSON.stringify(res));
      this.payments = res;
    });
  }

  ngOnDestroy() {
    this.payments$.unsubscribe();
  }

}
