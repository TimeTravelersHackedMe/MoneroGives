import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

import { Luz } from '../../providers/luz/luz';
import { PageParams } from '../../constants/interfaces';

@IonicPage({
  name: 'support',
  segment: 'support'
})
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {
  public page: PageParams = {slug: '', title: '', icon: ''};

  constructor(private view: ViewController) {
    Luz.getPageParams(this.view.id).then(data => {
      this.page = data;
    });
  }

}
