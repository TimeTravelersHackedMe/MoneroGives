import { Component } from '@angular/core';
import { AlertController, NavParams, ToastController, ViewController } from 'ionic-angular';

import { AdminPortSetting } from '../../shared/admin-port';
import { CONFIG } from '../../constants/config';
import { AdminDataProvider } from '../../providers/admin-data/admin-data';

@Component({
  selector: 'edit-setting',
  templateUrl: 'edit-setting.html'
})
export class EditSettingComponent {
  public data;
  public isNew: boolean = false;

  constructor(private alert: AlertController, private dataService: AdminDataProvider, private params: NavParams, private toast: ToastController, private view: ViewController) {
    if (this.params.data.new === true) this.isNew = true;
    this.data = new AdminPortSetting(this.params.data);
  }

  close() {
    this.view.dismiss();
  }

  confirmDelete() {
    const confirm = this.alert.create({
      title: 'Login',
      message: "Are you sure you want to delete this port?",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.delete();
          }
        }
      ]
    });
    confirm.present();
  }

  delete() {
    this.dataService.deletePort(this.data.portData).subscribe(msg => {

    });
  }

  save() {
    try {
      this.dataService.savePort(this.data.portData).subscribe(msg => {
        const message = this.toast.create({
          message: 'The settings were successfully saved.',
          duration: 3500,
          position: 'middle'
        });
        message.present();
      });
    } catch (e) {
      console.error('EditSettingComponent save() error: ', e);
    }
  }

}
