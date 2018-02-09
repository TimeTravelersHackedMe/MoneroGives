import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { BlocksPage } from './blocks';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BlocksPage,
  ],
  imports: [
    IonicPageModule.forChild(BlocksPage),
    ComponentsModule
  ],
})
export class BlocksPageModule {}
