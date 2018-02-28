import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { LoginModalComponent } from '../login-modal/login-modal';

@Component({
  selector: 'nav-bar',
  templateUrl: 'nav-bar.html'
})
export class NavBarComponent {
  @Input('page') page: any;

  constructor(private modalCtrl: ModalController) {}

  showLogin() {
    const modal = this.modalCtrl.create(LoginModalComponent);
    modal.present();
  }

}
