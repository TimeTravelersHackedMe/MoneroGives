import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';

import { Luz } from '../../providers/luz/luz';
import { PageParams, Ports } from '../../constants/interfaces';

@IonicPage({
  name: 'ports',
  segment: 'ports'
})
@Component({
  selector: 'page-ports',
  templateUrl: 'ports.html',
})
export class PortsPage implements OnDestroy {
  private portsCollection: AngularFirestoreCollection<any>;
  private ports$: Subscription;
  public ports: Array<Ports> = localStorage.getItem('ports') === null ? null : JSON.parse(localStorage.getItem('ports'));
  private pplnsPortsCollection: AngularFirestoreCollection<any>;
  private pplnsPorts$: Subscription;
  public pplnsPorts: Array<Ports> = localStorage.getItem('pplnsPorts') === null ? null : JSON.parse(localStorage.getItem('pplnsPorts'));
  private soloPortsCollection: AngularFirestoreCollection<any>;
  private soloPorts$: Subscription;
  public soloPorts: Array<Ports> = localStorage.getItem('soloPorts') === null ? null : JSON.parse(localStorage.getItem('soloPorts'));
  public segment: string = localStorage.getItem('portSegment') === null ? 'global' : JSON.parse(localStorage.getItem('portSegment'));
  public page: PageParams = {slug: '', title: '', icon: ''};
  public hasData: boolean = false;
  public pplnsHasData: boolean = false;
  public soloHasData: boolean = false;

  constructor(private db: AngularFirestore, private navCtrl: NavController, private nav: NavParams, private view: ViewController) {
    Luz.getPageParams(this.view.id).then(data => {
      this.page = data;
    });
    this.dataInit();
  }

  dataInit() {
    this.portsCollection = this.db.collection('ports/' + this.segment.toLowerCase() + '/global');
    this.ports$ = this.portsCollection.valueChanges().subscribe(res => {
      this.hasData = true;
      localStorage.setItem('ports', JSON.stringify(res));
      this.ports = res;
    });
    this.pplnsPortsCollection = this.db.collection('ports/' + this.segment.toLowerCase() + '/pplns');
    this.pplnsPorts$ = this.pplnsPortsCollection.valueChanges().subscribe(res => {
      this.pplnsHasData = true;
      localStorage.setItem('pplnsPorts', JSON.stringify(res));
      this.pplnsPorts = res;
    });
    this.soloPortsCollection = this.db.collection('ports/' + this.segment.toLowerCase() + '/solo');
    this.soloPorts$ = this.soloPortsCollection.valueChanges().subscribe(res => {
      this.soloHasData = true;
      localStorage.setItem('pplnsPorts', JSON.stringify(res));
      this.soloPorts = res;
    });
  }

  unsubscribe() {
    this.ports$.unsubscribe();
    this.pplnsPorts$.unsubscribe();
    this.soloPorts$.unsubscribe();
  }

  segmentChanged(event) {
    localStorage.setItem('segment', JSON.stringify(event.value));
    this.unsubscribe();
    this.dataInit();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

}
