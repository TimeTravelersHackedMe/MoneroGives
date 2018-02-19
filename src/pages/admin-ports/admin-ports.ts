import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { Luz } from '../../providers/luz/luz';
import { PageParams } from '../../constants/interfaces';

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
  public page: PageParams = { slug: '', title: '', icon: '' };

  constructor(private auth: AuthProvider, private view: ViewController) {
    Luz.getPageParams(this.view.id, true).then(data => {
      this.page = data;
    });
    this.isAdmin = this.auth.isAdmin;
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
