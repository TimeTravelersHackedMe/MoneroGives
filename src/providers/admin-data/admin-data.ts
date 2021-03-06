import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthProvider } from '../auth/auth';
import { CONFIG } from '../../constants/config';

@Injectable()
export class AdminDataProvider {

  constructor(private auth: AuthProvider, private http: HttpClient) { }

  private headers() {
    const token = this.validate();
    if (token) {
      return {
        headers: new HttpHeaders().set('x-access-token', token)
      }
    } else {
      return false;
    }
  }

  private validate() {
    const token = sessionStorage.getItem('token');
    if (token !== undefined) {
      return token;
    } else {
      this.auth.logout();
      return false;
    }
  }

  ports(segment) {
    const headers = this.headers();
    if(headers) {
      return this.http.get(CONFIG.admin.ports, headers);
    }
  }

  deletePort(data) {
    const headers = this.headers();
    if(headers) {
      return this.http.delete(CONFIG.admin.ports, headers);
    }
  }

  settings(category?: string) {
    const headers = this.headers();
    if (headers) {
      return this.http.get(CONFIG.admin.settings, headers);
    }
  }

  workers() {
    const headers = this.headers();
    if (headers) {
      return this.http.get(CONFIG.admin.workers, headers);
    }
  }

  savePort(data) {
    const headers: any = this.headers();
    return this.http.put(CONFIG.admin.ports, data, headers);
  }

  saveSetting(id, value) {
    const headers: any = this.headers();
    return this.http.put(CONFIG.admin.settings, {
      id: id,
      value: value
    }, headers);
  }

}
