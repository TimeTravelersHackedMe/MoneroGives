import { Injectable } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { PAGES } from '../../constants/pages';

@Injectable()
export class LuzProvider {

  constructor(public view: ViewController) {}

  getPageParams() {
    alert(this.view);
    let slug ='';
    for(const page of PAGES.LIST) {
      if(page.slug === slug) {
        return page;
      }
    }
    console.log('Page slug not found in page list.');
    return {
      icon: 'home',
      slug: 'home',
      title: 'Home'
    }
  }

}
