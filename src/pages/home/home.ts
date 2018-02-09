import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { LuzProvider } from '../../providers/luz/luz';

@IonicPage({
  name: 'home',
  segment: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  page;

  constructor(public luz: LuzProvider) {
    this.page = luz.getPageParams();
  }

}
