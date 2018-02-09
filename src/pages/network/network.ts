import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { LuzProvider } from '../../providers/luz/luz';

@IonicPage({
  name: 'network',
  segment: 'network'
})
@Component({
  selector: 'page-network',
  templateUrl: 'network.html',
})
export class NetworkPage {
  page;

  constructor() {
    this.page = LuzProvider.getPageParams(document.location.hash);
  }

}
