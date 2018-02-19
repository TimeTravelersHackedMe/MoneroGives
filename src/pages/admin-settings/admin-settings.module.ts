import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AdminSettingsPage } from './admin-settings';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    AdminSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminSettingsPage),
    ComponentsModule,
    PipesModule
  ],
})
export class AdminSettingsPageModule { }
