import { Component } from '@angular/core';
import { NavParams, ToastController, ViewController } from 'ionic-angular';

import { AdminPortSetting } from '../../shared/admin-port';
import { CONFIG } from '../../constants/config';
import { AdminDataProvider } from '../../providers/admin-data/admin-data';

@Component({
  selector: 'edit-setting',
  templateUrl: 'edit-setting.html'
})
export class EditSettingComponent {
  public data;

  constructor(private dataService: AdminDataProvider, private params: NavParams, private toast: ToastController, private view: ViewController) {
    this.data = new AdminPortSetting(this.params.data);
  }

  close() {
    this.view.dismiss();
  }

  save() {
    try {
      this.dataService.savePort(this.data).subscribe(msg => {
        const message = this.toast.create({
          message: 'The settings were successfully saved.',
          duration: 3500,
          position: 'middle'
        });
        message.present();
      });
    } catch (e) {
      console.error('EditSettingComponent save() error: ', e);
      const message = this.toast.create({
        message: 'An error occured while trying to save the port settings. Check the console.',
        duration: 3500,
        position: 'middle'
      });
      message.present();
    }
  }

}
