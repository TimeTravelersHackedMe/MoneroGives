import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CONFIG } from '../../constants/config';
import { Luz } from '../../providers/luz/luz';
import { AuthResponse } from '../../constants/interfaces';

@Injectable()
export class AuthProvider {
  private isUserAdmin: boolean = false;
  private adminToken: string;

  constructor(private http: HttpClient) {
    if(this.token) this.isUserAdmin = true;
  }

  async adminLogin(user: string, pass: string) {
    try {
      const adminData = await this.http.post<AuthResponse>(CONFIG.admin.auth, { username: user, password: pass }).toPromise();
      this.isUserAdmin = true;
      console.log(adminData);
      this.adminToken = adminData.msg;
      sessionStorage.setItem('token', this.adminToken);
      Luz.nav.setRoot('admin');
      return adminData;
    } catch (e) {
      console.error('adminLogin() error: ', e);
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
