import { Component, Input } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: 'nav-bar.html'
})
export class NavBarComponent {
  @Input('page') page: any;

  constructor() {}

}
