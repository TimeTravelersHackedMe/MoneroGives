import { Component, Input } from '@angular/core';

@Component({
  selector: 'save-settings-bar',
  templateUrl: 'save-settings-bar.html'
})
export class SaveSettingsBarComponent {
  @Input('virtualSettings') virtualSettings: any;

  text: string;

  constructor() {}

}
