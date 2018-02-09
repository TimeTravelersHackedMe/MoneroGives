import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { LuzProvider } from '../../providers/luz/luz';

@IonicPage({
  name: 'blocks',
  segment: 'blocks'
})
@Component({
  selector: 'page-blocks',
  templateUrl: 'blocks.html',
})
export class BlocksPage {
  page;

  constructor() {
    this.page = LuzProvider.getPageParams(document.location.hash);
  }

}
