import { Injectable } from '@angular/core';

import { PAGES } from '../../constants/pages';

@Injectable()
export class Luz {

  constructor() {}

  static getPageParams(slug) {
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
