import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

import { Luz } from '../../providers/luz/luz';
import { PageParams } from '../../constants/interfaces';

@IonicPage({
  name: 'getting-started',
  segment: 'getting-started'
})
@Component({
  selector: 'page-getting-started',
  templateUrl: 'getting-started.html',
})
export class GettingStartedPage {
  public page: PageParams = {slug: '', title: '', icon: ''};

  constructor(private view: ViewController) {
    Luz.getPageParams(this.view.id).then(data => {
      this.page = data;
    });
  }

}
