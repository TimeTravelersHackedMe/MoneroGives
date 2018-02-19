import { Component } from '@angular/core';

/**
 * Generated class for the AdminRightMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'admin-right-menu',
  templateUrl: 'admin-right-menu.html'
})
export class AdminRightMenuComponent {

  text: string;

  constructor() {
    console.log('Hello AdminRightMenuComponent Component');
    this.text = 'Hello World';
  }

}
