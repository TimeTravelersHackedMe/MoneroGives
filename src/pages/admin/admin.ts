import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { Luz } from '../../providers/luz/luz';
import { PageParams } from '../../constants/interfaces';

@IonicPage({
  name: 'admin',
  segment: 'admin'
})
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
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
