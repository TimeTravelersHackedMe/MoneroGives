import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

import { Luz } from '../../providers/luz/luz';

@IonicPage({
  name: 'faq',
  segment: 'faq'
})
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {
  page;

  constructor(private view: ViewController) {
    this.page = Luz.getPageParams(this.view.id);
  }

}
