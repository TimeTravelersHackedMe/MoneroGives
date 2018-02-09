import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NetworkPage } from './network';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    NetworkPage,
  ],
  imports: [
    IonicPageModule.forChild(NetworkPage),
    ComponentsModule
  ],
})
export class NetworkPageModule {}
