import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';

import { Luz } from '../../providers/luz/luz';
import { Block, PageParams } from '../../constants/interfaces';
import { CONFIG } from '../../constants/config';

@IonicPage({
  name: 'blocks',
  segment: 'blocks'
})
@Component({
  selector: 'page-blocks',
  templateUrl: 'blocks.html',
})
export class BlocksPage implements OnDestroy, OnInit {
  @ViewChild('hashColumn') hashColumn: any;
  @ViewChild('table') table: any;
  public hashColumnWidth: number;
  public overlayMaxWidth: number;
  public page: PageParams = { slug: '', title: '', icon: '' };
  private blocksCollection: AngularFirestoreCollection<Block>;
  private blocks$: Subscription;
  public blocks: Array<Block> = localStorage.getItem('blocks') === null ? null : JSON.parse(localStorage.getItem('blocks'));
  public coins: Array<string> = CONFIG.coins;
  private segment: string = localStorage.getItem('segment') === null ? CONFIG.coins[0] : JSON.parse(localStorage.getItem('segment'));


  constructor(private view: ViewController, private db: AngularFirestore) {
    console.log(this.blocks);
    Luz.getPageParams(this.view.id).then(data => {
      this.page = data;
    });
    this.blocksCollection = this.db.collection('blocks', ref => ref.orderBy('ts').limit(30));
    this.blocks$ = this.blocksCollection.valueChanges().subscribe(res => {
      localStorage.setItem('blocks', JSON.stringify(res));
      this.blocks = res;
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
    this.blocks$.unsubscribe();
  }

}
