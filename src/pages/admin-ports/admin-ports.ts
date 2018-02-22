import { Component, OnDestroy } from '@angular/core';
import { IonicPage, ModalController, ViewController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';
import { NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { Luz } from '../../providers/luz/luz';
import { PageParams } from '../../constants/interfaces';
import { AdminDataProvider } from '../../providers/admin-data/admin-data';
import { EditSettingComponent } from '../../components/edit-setting/edit-setting';

@IonicPage({
  name: 'admin/manage-ports',
  segment: 'admin/manage-ports'
})
@Component({
  selector: 'page-admin-ports',
  templateUrl: 'admin-ports.html',
})
export class AdminPortsPage implements OnDestroy {
  public isAdmin: boolean = false;
  private ports$: Subscription;
  public ports: any = localStorage.getItem('adminPorts') === null ? null : JSON.parse(localStorage.getItem('adminPorts'));
  public segment: string = localStorage.getItem('adminPortSegment') === null ? 'global' : JSON.parse(localStorage.getItem('adminPortSegment'));
  public page: PageParams = { slug: '', title: '', icon: '' };

  constructor(private auth: AuthProvider, private data: AdminDataProvider, private modal: ModalController, private view: ViewController) {
    Luz.getPageParams(this.view.id, true).then(data => {
      this.page = data;
    });
    this.isAdmin = this.auth.isAdmin;
    this.ports$ = this.data.ports(this.segment).subscribe(data => {
      localStorage.setItem('adminPorts', JSON.stringify(data));
      this.ports = data;
      console.log(data);
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

  editSetting(setting) {
    const modal = this.modal.create(EditSettingComponent, setting);
    modal.present();
  }

  newPort() {
    const modal = this.modal.create(EditSettingComponent, {new: true});
    modal.present();
  }

  ionViewCanEnter() {
    console.log(this.isAdmin);
    if (this.isAdmin) {
      return true;
    } else {
      setTimeout(() => {
        Luz.nav.setRoot('login');
      }, 1);
    }
  }

  ngOnDestroy() {
    this.ports$.unsubscribe();
  }

}
