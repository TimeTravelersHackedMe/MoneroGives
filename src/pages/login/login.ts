import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { Luz } from '../../providers/luz/luz';

@IonicPage({
  name: 'login',
  segment: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private user: string;
  private password: string;

  constructor(public auth: AuthProvider) {}

  login() {
    this.auth.adminLogin(this.user, this.password);
  }

  dashboard() {
    Luz.nav.setRoot('dashboard');
  }

}
