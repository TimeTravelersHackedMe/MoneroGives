import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { SideMenuEntryComponent } from './side-menu-entry/side-menu-entry';
import { NavBarComponent } from './nav-bar/nav-bar';

@NgModule({
	declarations: [
		SideMenuEntryComponent,
    NavBarComponent
	],
	imports: [
		IonicModule
	],
	exports: [
		SideMenuEntryComponent,
    NavBarComponent
	]
})
export class ComponentsModule {}
