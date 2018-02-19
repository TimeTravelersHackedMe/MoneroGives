import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

import { Luz } from '../../providers/luz/luz';
import { PageParams } from '../../constants/interfaces';

@IonicPage({
  name: 'faq',
  segment: 'faq'
})
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {
  public page: PageParams = {slug: '', title: '', icon: ''};

  constructor(private view: ViewController) {
    Luz.getPageParams(this.view.id).then(data => {
      this.page = data;
    });
  }

}
