import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

import { Luz } from '../../providers/luz/luz';

@IonicPage({
  name: 'ports',
  segment: 'ports'
})
@Component({
  selector: 'page-ports',
  templateUrl: 'ports.html',
})
export class PortsPage {
  page;

  constructor(private view: ViewController) {
    this.page = Luz.getPageParams(this.view.id);
  }

}
