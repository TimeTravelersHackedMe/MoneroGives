import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'side-menu-entry',
  templateUrl: 'side-menu-entry.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuEntryComponent {
  @Input('page') page: any;

  constructor() {}

}
