import { Component, OnDestroy } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { AdminDataProvider } from '../../providers/admin-data/admin-data';
import { AuthProvider } from '../../providers/auth/auth';
import { Luz } from '../../providers/luz/luz';
import { PageParams } from '../../constants/interfaces';

@IonicPage({
  name: 'admin/workers',
  segment: 'admin/workers'
})
@Component({
  selector: 'page-admin-workers',
  templateUrl: 'admin-workers.html',
})
export class AdminWorkersPage implements OnDestroy {
  public isAdmin: boolean = false;
  public page: PageParams = { slug: '', title: '', icon: '' };
  private workers$: Subscription;
  private workers;

  constructor(private auth: AuthProvider, public data: AdminDataProvider, private view: ViewController) {
    Luz.getPageParams(this.view.id, true).then(data => {
      this.page = data;
    });
    this.isAdmin = this.auth.isAdmin;
    this.workers$ = this.data.workers().subscribe(data => this.workers = data);
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

  ngOnDestroy() {
    this.workers$.unsubscribe();
  }
}
