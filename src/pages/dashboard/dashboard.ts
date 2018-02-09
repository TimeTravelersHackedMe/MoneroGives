import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { LuzProvider } from '../../providers/luz/luz';

@IonicPage({
  name: 'dashboard',
  segment: 'dashboard'
})
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  page;

  constructor() {
    this.page = LuzProvider.getPageParams(document.location.hash);
  }

}
