import { Component, OnDestroy } from '@angular/core';
import { IonicPage, ToastController, ViewController } from 'ionic-angular';
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
  private virtualSettings: any = false;

  constructor(private toast: ToastController, private auth: AuthProvider, private data: AdminDataProvider, private view: ViewController) {
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
    this.virtualSettings = false;
    this.settings$ = this.data.settings(this.segment).subscribe(data => {
      this.modules = CONFIG.admin.modules[this.segment];
      this.settings = data;
    });
  }

  updateVirtualSettings(setting, value) {
    console.log(value);
    if (this.virtualSettings === false) this.virtualSettings = {};
    this.virtualSettings[setting.id] = {
      value: value
    }
  }

  async saveSettings() {
    try {
      let promises = [];
      for (const setting in this.virtualSettings) {
        promises.push(await this.data.saveSetting(setting, this.virtualSettings[setting].value).subscribe(data => {
          console.log(data);
        }));
      }
      await Promise.all(promises);
      const message = this.toast.create({
        message: 'The settings were successfully saved.',
        duration: 3500,
        position: 'middle'
      });
      message.present();
      this.virtualSettings = false;
    } catch (e) {
      console.error('saveSettings() error: ', e);
      const message = this.toast.create({
        message: 'There was an error saving the settings. Check the console for more details.',
        duration: 3500,
        position: 'middle'
      });
      message.present();
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
