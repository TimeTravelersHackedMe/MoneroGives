import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from 'ionic-angular';

import { CONFIG } from '../../constants/config';
import { Luz } from '../../providers/luz/luz';
import { AuthResponse } from '../../constants/interfaces';

@Injectable()
export class AuthProvider {
  private isUserAdmin: boolean = false;
  private adminToken: string;

  constructor(private http: HttpClient, private toast: ToastController) {
    if(this.token) this.isUserAdmin = true;
  }

  async adminLogin(user: string, pass: string) {
    try {
      const adminData = await this.http.post<AuthResponse>(CONFIG.admin.auth, { username: user, password: pass }).toPromise();
      this.isUserAdmin = true;
      this.adminToken = adminData.msg;
      sessionStorage.setItem('token', this.adminToken);
      Luz.nav.setRoot('admin');
      return adminData;
    } catch (e) {
      let toastMessage;
      if(e.error && e.error.msg === 'Invalid username/password') {
        toastMessage = 'Woops! That\'s an invalid username/password.';
      } else {
        toastMessage = 'Unhandled login error. Check the console.';
        console.error('Unhandled login error:', e);
      }
      const toast = this.toast.create({
        message: toastMessage,
        duration: 3500,
        position: 'middle'
      });
      toast.present();
    }
  }

  logout() {
    sessionStorage.removeItem('token');
    this.isUserAdmin = false;
    Luz.nav.setRoot('login');
  }

  get isAdmin() {
    return this.isUserAdmin;
  }

  get token() {
    return sessionStorage.getItem('token');
  }

}
