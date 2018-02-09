import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { LuzProvider } from '../../providers/luz/luz';

@IonicPage({
  name: 'faq',
  segment: 'faq'
})
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {
  page;

  constructor() {
    this.page = LuzProvider.getPageParams(document.location.hash);
  }

}
