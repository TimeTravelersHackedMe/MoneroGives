import { Injectable } from '@angular/core';
import { Nav } from 'ionic-angular';

import { PAGES } from '../../constants/pages';
import { PageParams } from '../../constants/interfaces';

@Injectable()
export class Luz {
  static nav: Nav;

  constructor() { }

  static getPageParams(slug, admin?: boolean): Promise<PageParams> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if(typeof slug === 'undefined') slug = window.location.hash.substring(2);
        if(slug && slug.substring(0, 5) === 'ports') slug = 'ports';
        const pageList: Array<PageParams> = admin ? PAGES.ADMIN_LIST : PAGES.LIST;
        for (const page of pageList) {
          if (page.slug === slug) {
            return resolve(page);
          }
        }
        console.error('Page slug not found in page list:', slug);
        return resolve({
          icon: 'close',
          slug: 'home',
          title: 'Something is Wrong!'
        });
      }, 1);
    });
  }
}
