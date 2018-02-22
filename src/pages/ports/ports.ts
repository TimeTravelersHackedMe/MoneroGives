import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';

import { Luz } from '../../providers/luz/luz';
import { PageParams, Ports } from '../../constants/interfaces';

@IonicPage({
  name: 'ports',
  segment: 'ports/:subpage'
})
@Component({
  selector: 'page-ports',
  templateUrl: 'ports.html',
})
export class PortsPage implements OnDestroy {
  private portsCollection: AngularFirestoreCollection<any>;
  private ports$: Subscription;
  public ports: Array<Ports> = localStorage.getItem('ports') === null ? null : JSON.parse(localStorage.getItem('ports'));
  public segment: string = localStorage.getItem('portSegment') === null ? 'global' : JSON.parse(localStorage.getItem('portSegment'));
  public page: PageParams = {slug: '', title: '', icon: ''};
  public hasData: boolean = false;

  constructor(private db: AngularFirestore, private navCtrl: NavController, private nav: NavParams, private view: ViewController) {
    this.segment = this.nav.data.subpage;
    Luz.getPageParams(this.view.id).then(data => {
      this.page = data;
    });
    this.portsCollection = this.db.collection('pool/ports/' + this.segment);
    this.ports$ = this.portsCollection.valueChanges().subscribe(res => {
      localStorage.setItem('ports', JSON.stringify(res));
      this.ports = res;
    });
  }

  segmentChanged(event) {
    this.hasData = false;
    history.pushState(null, null, '/#/ports/' + event.value);
    localStorage.setItem('portSegment', JSON.stringify(event.value));
    localStorage.removeItem('ports');
    this.ports$.unsubscribe();
    this.portsCollection = this.db.collection('pool/ports/' + event.value);
    this.ports$ = this.portsCollection.valueChanges().subscribe(res => {
      this.hasData = true;
      localStorage.setItem('ports', JSON.stringify(res));
      this.ports = res;
    });
  }

  ngOnDestroy() {
    this.ports$.unsubscribe();
  }

}
