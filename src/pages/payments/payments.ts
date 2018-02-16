<<<<<<< HEAD
import { Component, HostListener, ViewChild } from '@angular/core';
=======
import { Component, OnDestroy } from '@angular/core';
>>>>>>> 6897340ed44d5f3982e9eaf331752d11a610adc0
import { IonicPage, ViewController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';

import { Luz } from '../../providers/luz/luz';
<<<<<<< HEAD
import { Payment } from '../../constants/interfaces';
=======
import { Block } from '../../constants/interfaces';
>>>>>>> 6897340ed44d5f3982e9eaf331752d11a610adc0

@IonicPage({
  name: 'payments',
  segment: 'payments'
})
@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html',
})
<<<<<<< HEAD
export class PaymentsPage {
  @ViewChild('hashColumn') hashColumn: any;
  @ViewChild('table') table: any;
  public hashColumnWidth: number;
  public overlayMaxWidth: number;
  public page;
  private paymentsCollection: AngularFirestoreCollection<Payment>;
  private payments$: Subscription;
  public payments: Array<Payment> = localStorage.getItem('payments') === null ? null : JSON.parse(localStorage.getItem('payments'));


  constructor(private db: AngularFirestore, private view: ViewController) {
=======
export class PaymentsPage implements OnDestroy {
  private paymentsCollection: AngularFirestoreCollection<Block>;
  private payments$: Subscription;
  public payments: Array<Block> = localStorage.getItem('payments') === null ? null : JSON.parse(localStorage.getItem('payments'));;
  public page;

  constructor(private view: ViewController, private db: AngularFirestore) {
>>>>>>> 6897340ed44d5f3982e9eaf331752d11a610adc0
    this.page = Luz.getPageParams(this.view.id);
    this.paymentsCollection = this.db.collection('payments', ref => ref.orderBy('ts').limit(30));
    this.payments$ = this.paymentsCollection.valueChanges().subscribe(res => {
      localStorage.setItem('payments', JSON.stringify(res));
      this.payments = res;
    });
  }

<<<<<<< HEAD
  handleHashOverlay() {
    this.hashColumnWidth = this.hashColumn.nativeElement.clientWidth;
    this.overlayMaxWidth = this.table.nativeElement.clientWidth - this.hashColumn.nativeElement.offsetLeft;
=======
  ngOnDestroy() {
    this.payments$.unsubscribe();
>>>>>>> 6897340ed44d5f3982e9eaf331752d11a610adc0
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
