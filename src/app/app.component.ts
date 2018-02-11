import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PAGES } from '../constants/pages';
import { MinerProvider } from '../providers/miner/miner';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'home';
  pages;
  test;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, miner: MinerProvider) {
    this.pages = PAGES.LIST;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    miner.start();
  }

  openPage(page) {
    this.nav.setRoot(page.slug);
  }
}

