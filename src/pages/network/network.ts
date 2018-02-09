import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

import { Luz } from '../../providers/luz/luz';

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

  constructor(private view: ViewController) {
    this.page = Luz.getPageParams(this.view.id);
  }

}
