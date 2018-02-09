import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

import { Luz } from '../../providers/luz/luz';

@IonicPage({
  name: 'getting-started',
  segment: 'getting-started'
})
@Component({
  selector: 'page-getting-started',
  templateUrl: 'getting-started.html',
})
export class GettingStartedPage {
  page;

  constructor(private view: ViewController) {
    this.page = Luz.getPageParams(this.view.id);
  }

}
