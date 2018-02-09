import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

import { Luz } from '../../providers/luz/luz';

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

  constructor(private view: ViewController) {
    this.page = Luz.getPageParams(this.view.id);
  }

}
