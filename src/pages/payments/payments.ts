import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { LuzProvider } from '../../providers/luz/luz';

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

  constructor() {
    this.page = LuzProvider.getPageParams(document.location.hash);
  }

}
