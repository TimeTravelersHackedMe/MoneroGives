import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

import { Luz } from '../../providers/luz/luz';

@IonicPage({
  name: 'payments',
  segment: 'payments'
})
@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html',
})
export class PaymentsPage {
  page;

  constructor(private view: ViewController) {
    this.page = Luz.getPageParams(this.view.id);
  }

}
