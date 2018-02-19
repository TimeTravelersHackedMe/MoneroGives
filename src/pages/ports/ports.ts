import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
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
export class PortsPage {
  private portsCollection: AngularFirestoreCollection<any>;
  private ports$: Subscription;
  public ports: Array<Ports> = localStorage.getItem('ports') === null ? null : JSON.parse(localStorage.getItem('ports'));
  public segment: string = localStorage.getItem('portSegment') === null ? 'global' : JSON.parse(localStorage.getItem('portSegment'));
  public page: PageParams = {slug: '', title: '', icon: ''};

  constructor(private db: AngularFirestore, private view: ViewController) {
    Luz.getPageParams(this.view.id).then(data => {
      this.page = data;
    });
    this.portsCollection = this.db.collection('pool/ports/global');
    this.ports$ = this.portsCollection.valueChanges().subscribe(res => {
      localStorage.setItem('ports', JSON.stringify(res));
      this.ports = res;
    });
  }

  segmentChanged(event) {
    localStorage.setItem('portSegment', JSON.stringify(event.value));
    localStorage.removeItem('ports');
    this.ports$.unsubscribe();
    this.portsCollection = this.db.collection('pool/ports/' + event.value);
    this.ports$ = this.portsCollection.valueChanges().subscribe(res => {
      localStorage.setItem('ports', JSON.stringify(res));
      this.ports = res;
    });
  }

}
