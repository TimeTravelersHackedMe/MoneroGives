import { Component, OnDestroy } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { AuthProvider } from '../../providers/auth/auth';
import { AdminDataProvider } from '../../providers/admin-data/admin-data';
import { Luz } from '../../providers/luz/luz';
import { PageParams } from '../../constants/interfaces';
import { CONFIG } from '../../constants/config';

@IonicPage({
  name: 'admin/settings',
  segment: 'admin/settings'
})
@Component({
  selector: 'page-admin-settings',
  templateUrl: 'admin-settings.html',
})
export class AdminSettingsPage implements OnDestroy {
  public isAdmin: boolean = false;
  public page: PageParams = { slug: '', title: '', icon: '' };
  private segment: string = localStorage.getItem('defaultSettingsView') === null ? 'pool' : JSON.parse(localStorage.getItem('defaultSettingsView'));
  private settings$;
  private settings;
  private modules;
  private virtualSettings = {};

  constructor(private auth: AuthProvider, private data: AdminDataProvider, private view: ViewController) {
    Luz.getPageParams(this.view.id, true).then(data => {
      this.page = data;
    });
    this.isAdmin = this.auth.isAdmin;
    this.modules = CONFIG.admin.modules[this.segment];
    this.settings$ = this.data.settings(this.segment).subscribe(data => {
      this.modules = CONFIG.admin.modules[this.segment];
      console.log(data);
      this.settings = data;
    });
  }

  segmentChanged(event) {
    localStorage.setItem('defaultSettingsView', JSON.stringify(event.value));
    this.settings$.unsubscribe();
    this.settings$ = this.data.settings(this.segment).subscribe(data => {
      this.modules = CONFIG.admin.modules[this.segment];
      this.settings = data;
    });
  }

  updateVirtualSettings(setting, $event) {
    this.virtualSettings[setting.id] = {
      value: $event.target.value
    }
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
    this.settings$.unsubscribe();
  }
}
