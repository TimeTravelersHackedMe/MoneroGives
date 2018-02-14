import { Component, OnDestroy } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';

import { Luz } from '../../providers/luz/luz';
import { Block } from '../../constants/interfaces';

@IonicPage({
  name: 'blocks',
  segment: 'blocks'
})
@Component({
  selector: 'page-blocks',
  templateUrl: 'blocks.html',
})
export class BlocksPage implements OnDestroy {
  public page;
  private blocksCollection: AngularFirestoreCollection<Block>;
  private blocks$: Subscription;
  public blocks: Array<Block> = localStorage.getItem('blocks') === null ? null : JSON.parse(localStorage.getItem('blocks'));;

  constructor(private view: ViewController, private db: AngularFirestore) {
    this.page = Luz.getPageParams(this.view.id);
    this.blocksCollection = this.db.collection('blocks', ref => ref.orderBy('ts').limit(30));
    this.blocks$ = this.blocksCollection.valueChanges().subscribe(res => {
      localStorage.setItem('blocks', JSON.stringify(res));
      this.blocks = res;
    });
  }

  ngOnDestroy() {
    this.blocks$.unsubscribe();
  }

}
