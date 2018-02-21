import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';

import { AuthProvider } from '../../providers/auth/auth';
import { Luz } from '../../providers/luz/luz';
import { PageParams } from '../../constants/interfaces';
import { AdminDataProvider } from '../../providers/admin-data/admin-data';

@IonicPage({
  name: 'admin/ports',
  segment: 'admin/ports'
})
@Component({
  selector: 'page-admin-ports',
  templateUrl: 'admin-ports.html',
})
export class AdminPortsPage {
  public isAdmin: boolean = false;
  private ports$: Subscription;
  public ports: any = localStorage.getItem('adminPorts') === null ? null : JSON.parse(localStorage.getItem('adminPorts'));
  public segment: string = localStorage.getItem('adminPortSegment') === null ? 'global' : JSON.parse(localStorage.getItem('adminPortSegment'));
  public page: PageParams = { slug: '', title: '', icon: '' };

  constructor(private auth: AuthProvider, private data: AdminDataProvider, private view: ViewController) {
    Luz.getPageParams(this.view.id, true).then(data => {
      this.page = data;
    });
    this.isAdmin = this.auth.isAdmin;
    this.ports$ = this.data.ports(this.segment).subscribe(data => {
      localStorage.setItem('adminPorts', JSON.stringify(data));
      this.ports = data;
    });
  }

  segmentChanged(event) {
    localStorage.setItem('adminPortSegment', JSON.stringify(event.value));
    localStorage.removeItem('adminPorts');
    this.ports$.unsubscribe();
    this.ports$ = this.data.ports(this.segment).subscribe(data => {
      localStorage.setItem('adminPorts', JSON.stringify(data));
      this.ports = data;
    });
  }

  ionViewCanEnter() {
    if (this.isAdmin) {
      return true;
    } else {
      setTimeout(() => {
        Luz.nav.setRoot('login');
      }, 1);
    }
  }

}
