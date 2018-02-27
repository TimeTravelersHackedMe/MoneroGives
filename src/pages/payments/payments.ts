import { Component, HostListener, ViewChild } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';

import { Luz } from '../../providers/luz/luz';
import { PageParams, Payment } from '../../constants/interfaces';
import { CONFIG } from '../../constants/config';

@IonicPage({
  name: 'payments',
  segment: 'payments'
})
@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html',
})
export class PaymentsPage {
  @ViewChild('hashColumn') hashColumn: any;
  @ViewChild('table') table: any;
  public hashColumnWidth: number;
  public overlayMaxWidth: number;
  public page: PageParams = {slug: '', title: '', icon: ''};
  private paymentsCollection: AngularFirestoreCollection<Payment>;
  private payments$: Subscription;
  public payments: Array<Payment> = localStorage.getItem('payments') === null ? null : JSON.parse(localStorage.getItem('payments'));
  public coins: Array<string> = CONFIG.coins;
  private segment: string = localStorage.getItem('segment') === null ? CONFIG.coins[0] : JSON.parse(localStorage.getItem('segment'));

  constructor(private db: AngularFirestore, private view: ViewController) {
    Luz.getPageParams(this.view.id).then(data => {
      this.page = data;
    });
    this.paymentsCollection = this.db.collection('payments', ref => ref.orderBy('ts').limit(30));
    this.payments$ = this.paymentsCollection.valueChanges().subscribe(res => {
      localStorage.setItem('payments', JSON.stringify(res));
      this.payments = res;
    });
  }

  segmentChanged(event) {
    localStorage.setItem('segment', JSON.stringify(event.value));
  }

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

  ngOnDestroy() {
    this.payments$.unsubscribe();
  }
}
