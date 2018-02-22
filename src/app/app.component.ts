import { Component, OnInit, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PAGES } from '../constants/pages';
import { MinerProvider } from '../providers/miner/miner';
import { Luz } from '../providers/luz/luz';


@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;
  private rootPage: any = 'dashboard';
  private pages;
  private adminPages;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, miner: MinerProvider) {
    this.pages = PAGES.LIST;
    this.adminPages = PAGES.ADMIN_LIST;
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    miner.start();
  }

  get isLogin() {
    return window.location.hash.substring(0, 7) === '#/login' ? true : false;
  }

  get isAdmin() {
    return window.location.hash.substring(0, 7) === '#/admin' ? true : false;
  }

  openPage(page) {
    if(page.subpage) {
      this.nav.setRoot(page.slug, {subpage: page.subpage});
    } else {
      this.nav.setRoot(page.slug);
    }
  }

  ngOnInit() {
    setTimeout(() => {
      Luz.nav = this.nav;
    },1);
  }
}

