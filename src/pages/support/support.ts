import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { LuzProvider } from '../../providers/luz/luz';

@IonicPage({
  name: 'support',
  segment: 'support'
})
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {
  page;

  constructor() {
    this.page = LuzProvider.getPageParams(document.location.hash);
  }

}
