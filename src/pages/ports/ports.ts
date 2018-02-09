import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';

import { LuzProvider } from '../../providers/luz/luz';

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

  constructor(public luz: LuzProvider, public nav: NavController, private ViewController: ViewController) {
    alert(this.ViewController.name);
    //this.page = luz.getPageParams();
  }

}
